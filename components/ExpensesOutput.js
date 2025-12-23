// ...existing code...
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Text, View, FlatList, StyleSheet, Platform, Pressable, Animated } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

function ExpenseItem({ item, onDeleteExpense }) {
    const navigation = useNavigation();

    function expenseHandler() {
        navigation.navigate('ManageExpense', { expense: item });
    }

    function deleteHandler() {
        onDeleteExpense(item.id);
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
                    <Text style={styles.date}>{item.date.toLocaleDateString('en-IN')}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>${item.amount.toFixed(2)}</Text>
                </View>
                <Pressable
                    style={styles.deleteBtn}
                    onPress={deleteHandler}
                    android_ripple={{ color: '#ffcccc' }}
                >
                    <Ionicons name="trash" size={20} color="#e74c3c" />
                </Pressable>
            </View>
        </Pressable>
    );
}

// ...existing code...

function ExpensesOutput({ expenses, period, onDeleteExpense }) {

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useFocusEffect(
        React.useCallback(() => {
            fadeAnim.setValue(-20);
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }, [fadeAnim])
    );

    const items = expenses;
    const sortedItems = items.slice().sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const expensesSum = sortedItems.reduce((acc, expense) => acc + expense.amount, 0);

    const currentDate = new Date().toLocaleDateString('en-IN');
    const displayPeriod = period === 'Total' ? `Total` : `Last 7 Days`;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.period}>{displayPeriod}</Text>
                <Text style={styles.total}>${expensesSum.toFixed(2)}</Text>
            </View>

            {sortedItems.length === 0 ? (
                <Animated.View style={[styles.emptyContainer, { transform: [{ translateY: fadeAnim }] }]}>
                    <Text style={styles.emptyText}>No expenses to track</Text>
                </Animated.View>
            ) : (
                <Animated.View style={{ transform: [{ translateY: fadeAnim }] }}>
                    <FlatList
                        data={sortedItems}
                        renderItem={({ item }) => <ExpenseItem item={item} onDeleteExpense={onDeleteExpense} />}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                    />
                </Animated.View>
            )}
        </View>
    )
}


export default ExpensesOutput;

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
    deleteBtn: {
        padding: 8,
        marginLeft: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    emptyText: {
        fontSize: 18,
        color: '#6b7280',
        textAlign: 'center',
    },
});