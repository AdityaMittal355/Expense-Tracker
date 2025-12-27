import { useContext, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from '../contexts/ExpensesContext';
import { useAuth } from '../contexts/AuthContext';

function AllExpenses() {
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

  return <ExpensesOutput expenses={expensesCtx.expenses} period="Total" onDeleteExpense={expensesCtx.deleteExpense} />;
}

export default AllExpenses;