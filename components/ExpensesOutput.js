// ...existing code...
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, FlatList, StyleSheet, Platform, Pressable } from "react-native";
import { DummyExpenses } from '../constants/Dummy_Expenses';

function ExpenseItem({ item }) {
    const navigation = useNavigation();

    function expenseHandler() {
        navigation.navigate('ManageExpense');
    }

    return (
        <Pressable
            android_ripple={{ color: '#e6e9ee' }}
            style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
            onPress={expenseHandler}
        >
            <View style={styles.card}>
                <View style={styles.itemLeft}>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.date}>{item.date.toLocaleDateString()}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>${item.amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    );
}

// ...existing code...

function ExpensesOutput({ expenses, period}) {

    const items = expenses ?? DummyExpenses;
    const sortedItems = items.slice().sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const expensesSum = sortedItems.reduce((acc, expense) => acc + expense.amount, 0);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.period}>{period}</Text>
                <Text style={styles.total}>${expensesSum.toFixed(2)}</Text>
            </View>

            <FlatList
                data={sortedItems}
                renderItem={({ item }) => <ExpenseItem item={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    )
}


export default ExpensesOutput;
// ...existing code...

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f7fb',
    },
    header: {
        backgroundColor: '#283244',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        alignItems: 'center',
    },
    period: {
        color: '#cbd5e1',
        fontSize: 20,
        marginBottom: 6,
    },
    total: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
    },
    list: {
        paddingBottom: 24,
    },
    // Pressable wrapper gets the vertical spacing and rounded overflow for ripple
    pressable: {
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 6,
    },
    // subtle pressed feedback for iOS (and general visual feedback)
    pressed: {
        opacity: 0.85,
        transform: [{ scale: 0.997 }],
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        // marginVertical removed — handled by pressable wrapper
        borderRadius: 10,
        // shadows
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    itemLeft: {
        flex: 1,
        marginRight: 12,
    },
    description: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    date: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 4,
    },
    amountContainer: {
        minWidth: 80,
        alignItems: 'flex-end',
    },
    amountText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#16a34a',
    },
});