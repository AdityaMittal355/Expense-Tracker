import { useContext, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from '../contexts/ExpensesContext';

function AllExpenses() {
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

  return <ExpensesOutput expenses={expensesCtx.expenses} period="Total" onDeleteExpense={expensesCtx.deleteExpense} />;
}

export default AllExpenses;