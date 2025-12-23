import { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const storedExpenses = await AsyncStorage.getItem('expenses');
        if (storedExpenses) {
          const parsedExpenses = JSON.parse(storedExpenses);
          // Convert date strings back to Date objects
          const expensesWithDates = parsedExpenses.map(exp => ({
            ...exp,
            date: new Date(exp.date),
          }));
          dispatch({ type: 'SET', payload: expensesWithDates });
        } else {
          // No stored expenses, start with empty
          dispatch({ type: 'SET', payload: [] });
        }
      } catch (error) {
        console.error('Failed to load expenses:', error);
        dispatch({ type: 'SET', payload: [] });
      }
    }
    loadExpenses();
  }, []);

  useEffect(() => {
    async function saveExpenses() {
      try {
        // Convert Date objects to strings for JSON
        const expensesToSave = expensesState.map(exp => ({
          ...exp,
          date: exp.date.toISOString(),
        }));
        await AsyncStorage.setItem('expenses', JSON.stringify(expensesToSave));
      } catch (error) {
        console.error('Failed to save expenses:', error);
      }
    }
    saveExpenses();
  }, [expensesState]);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;