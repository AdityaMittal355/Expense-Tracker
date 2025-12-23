import { useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ExpensesContext } from '../contexts/ExpensesContext';
import { Ionicons } from '@expo/vector-icons';

function ManageExpenses() {
  const route = useRoute();
  const navigation = useNavigation();
  const expensesCtx = useContext(ExpensesContext);
  const expense = route.params?.expense;

  if (!expense) {
    return (
      <View style={styles.container}>
        <Text>No expense selected.</Text>
      </View>
    );
  }

  function deleteExpenseHandler() {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            expensesCtx.deleteExpense(expense.id);
            navigation.goBack();
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.label}>Expense:</Text>
        <Text style={styles.value}>{expense.description}</Text>

        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>${expense.amount.toFixed(2)}</Text>

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{expense.date.toLocaleDateString('en-IN')}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={[styles.btn, styles.btnDelete]}
          onPress={deleteExpenseHandler}
          android_ripple={{ color: '#ffcccc' }}
        >
          <Ionicons name="trash" size={20} color="#fff" />
          <Text style={styles.btnText}>Delete Expense</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f7fb',
  },
  details: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: '#111827',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnDelete: {
    backgroundColor: '#e74c3c',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
});