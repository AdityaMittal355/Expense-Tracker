import { useContext, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from '../contexts/ExpensesContext';
import { useAuth } from '../contexts/AuthContext';

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const navigation = useNavigation();
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: logout },
    ]);
  };

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
      headerLeft: ({ tintColor }) => (
        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => ({ marginLeft: 16, opacity: pressed ? 0.7 : 1 })}
        >
          <Ionicons name="log-out-outline" size={24} color={tintColor || '#000'} />
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