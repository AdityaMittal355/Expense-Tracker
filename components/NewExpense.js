import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function NewExpense({ navigation, route }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [touched, setTouched] = useState({ desc: false, amount: false, date: false });
  const [showPicker, setShowPicker] = useState(false);

  const amountNum = parseFloat(amount);
  const parsedDate = date;
  const validDescription = description.trim().length > 0;
  const validAmount = !Number.isNaN(amountNum) && amountNum > 0;
  const validDate = !Number.isNaN(parsedDate.getTime());
  const formValid = validDescription && validAmount && validDate;

  function onSave() {
    setTouched({ desc: true, amount: true, date: true });
    if (!formValid) {
      Alert.alert('Invalid input', 'Please correct the highlighted fields.');
      return;
    }

    const newExpense = {
      id: 'e' + Date.now(),
      description: description.trim(),
      amount: amountNum,
      date: parsedDate,
    };

    if (route?.params?.onAddExpense && typeof route.params.onAddExpense === 'function') {
      route.params.onAddExpense(newExpense);
      navigation.goBack();
      return;
    }

    console.log('Saved expense', newExpense);
    navigation.goBack();
  }

  function onCancel() {
    navigation.goBack();
  }

  function showDatePicker() {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setDate(selectedDate);
        }
      },
      mode: 'date',
      is24Hour: true,
      maximumDate: new Date(),
    });
  }

  const descError = !validDescription && touched.desc ? 'Enter a description' : '';
  const amountError = !validAmount && touched.amount ? 'Enter a valid amount > 0' : '';
  const dateError = !validDate && touched.date ? 'Select a valid date' : '';

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.form}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, descError ? styles.inputError : null]}
          placeholder="Coffee, Groceries..."
          value={description}
          onChangeText={(t) => setDescription(t)}
          onBlur={() => setTouched((s) => ({ ...s, desc: true }))}
          returnKeyType="done"
        />
        {descError ? <Text style={styles.errorText}>{descError}</Text> : null}

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={[styles.input, amountError ? styles.inputError : null]}
          placeholder="12.50"
          value={amount}
          onChangeText={(t) => setAmount(t.replace(/[^0-9.]/g, ''))}
          keyboardType="decimal-pad"
          onBlur={() => setTouched((s) => ({ ...s, amount: true }))}
          returnKeyType="done"
        />
        {amountError ? <Text style={styles.errorText}>{amountError}</Text> : null}

        <Text style={styles.label}>Date</Text>
        <Pressable
          style={[styles.input, dateError ? styles.inputError : null]}
          onPress={showDatePicker}
        >
          <Text style={styles.dateText}>{date.toLocaleDateString('en-IN')}</Text>
        </Pressable>
        {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}

        <View style={styles.actions}>
          <Pressable
            android_ripple={{ color: '#ccc' }}
            style={({ pressed }) => [styles.btn, styles.btnCancel, pressed && styles.pressed]}
            onPress={onCancel}
          >
            <Text style={styles.btnText}>Cancel</Text>
          </Pressable>

          <Pressable
            android_ripple={{ color: '#2f95dc55' }}
            style={({ pressed }) => [
              styles.btn,
              formValid ? styles.btnSave : styles.btnDisabled,
              pressed && styles.pressed,
            ]}
            onPress={onSave}
            disabled={!formValid}
          >
            <Text style={[styles.btnText, formValid ? null : styles.btnTextDisabled]}>Save</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  form: { flex: 1, justifyContent: 'flex-start' },
  label: { fontSize: 14, color: '#333', marginTop: 12, marginBottom: 6, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#e6e6e6',
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  inputError: { borderColor: '#e74c3c' },
  errorText: { color: '#e74c3c', marginTop: 6, fontSize: 12 },
  dateText: { fontSize: 16, color: '#333' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  btn: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnCancel: { backgroundColor: '#f0f0f0' },
  btnSave: { backgroundColor: '#2f95dc' },
  btnDisabled: { backgroundColor: '#b5d0ea' },
  btnText: { color: '#000', fontWeight: '700' },
  btnTextDisabled: { color: '#fff4' },
  pressed: { opacity: 0.85, transform: [{ scale: 0.997 }] },
});