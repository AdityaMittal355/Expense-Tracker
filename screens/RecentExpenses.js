import ExpensesOutput from "../components/ExpensesOutput";


function RecentExpenses() {
  return ExpensesOutput({ period: 'Last 7 Days' });
}

export default RecentExpenses;