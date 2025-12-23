import { useContext, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from '../contexts/ExpensesContext';

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <Pressable
          onPress={() => navigation.navigate('CreateExpense', { onAddExpense: expensesCtx.addExpense })}
          style={({ pressed }) => ({ marginRight: 16, opacity: pressed ? 0.7 : 1 })}
        >
          <Ionicons name="add" size={24} color={tintColor || '#000'} />
        </Pressable>
      ),
    });
  }, [navigation, expensesCtx.addExpense]);

  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const recentExpenses = expensesCtx.expenses.filter((e) => {
    const expenseDate = new Date(e.date);
    return expenseDate >= sevenDaysAgo && expenseDate <= today;
  });

  return <ExpensesOutput expenses={recentExpenses} period="Last 7 Days" onDeleteExpense={expensesCtx.deleteExpense} />;
}

export default RecentExpenses;