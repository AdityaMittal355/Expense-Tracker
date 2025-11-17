import ExpensesOutput from "../components/ExpensesOutput";
import { DummyExpenses } from "../constants/Dummy_Expenses";

function RecentExpenses() {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const recentExpenses = DummyExpenses.filter((e) => {
    const expenseDate = new Date(e.date);
    return expenseDate >= sevenDaysAgo && expenseDate <= today;
  });

  return <ExpensesOutput expenses={recentExpenses} period="Last 7 Days" />;
}

export default RecentExpenses;