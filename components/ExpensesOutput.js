import React from 'react';
import { Text, View, FlatList, StyleSheet, Platform, Pressable } from "react-native";

const DummyExpenses = [
    { id: 'e1', description: 'Shoes', amount: 59.99, date: new Date('2022-12-19') },
    { id: 'e2', description: 'Groceries', amount: 16.78, date: new Date('2022-12-20') },
    { id: 'e3', description: 'Book', amount: 12.99, date: new Date('2022-12-21') },
];

function renderExpenseItem({ item }) {
    return (
        <Pressable>
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


function ExpensesOutput({ expenses, period}) {

    const items = expenses ?? DummyExpenses;
    const expensesSum = items.reduce((acc, expense) => acc + expense.amount, 0);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.period}>{period}</Text>
                <Text style={styles.total}>${expensesSum.toFixed(2)}</Text>
            </View>

            <FlatList
                data={items}
                renderItem={renderExpenseItem}
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
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        marginVertical: 6,
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
        color: '#16a34a', // green for positive/expense amount
    },
});