import { createContext, useReducer, useEffect } from 'react';
import { ref, onValue, push, update, remove } from 'firebase/database';
import { database } from '../firebase';
import { useAuth } from './AuthContext';

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
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      dispatch({ type: 'SET', payload: [] });
      return;
    }
    const expensesRef = ref(database, `expenses/${currentUser.uid}`);
    const unsubscribe = onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const expenses = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
          date: new Date(data[key].date),
        }));
        dispatch({ type: 'SET', payload: expenses });
      } else {
        dispatch({ type: 'SET', payload: [] });
      }
    });
    return () => unsubscribe();
  }, [currentUser]);

  function addExpense(expenseData) {
    if (!currentUser) return;
    const expensesRef = ref(database, `expenses/${currentUser.uid}`);
    push(expensesRef, { ...expenseData, date: expenseData.date.toISOString() });
  }

  function deleteExpense(id) {
    if (!currentUser) return;
    remove(ref(database, `expenses/${currentUser.uid}/${id}`));
  }

  function updateExpense(id, expenseData) {
    if (!currentUser) return;
    update(ref(database, `expenses/${currentUser.uid}/${id}`), { ...expenseData, date: expenseData.date.toISOString() });
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