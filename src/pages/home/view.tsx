import { Expense } from '../../types/expense';
import ExpenseFormCreate from '../../components/ExpenseFormCreate';
import ExpenseList from '../../components/ExpenseList';

interface ExpenseViewProps {
  expenses: Expense[];
  onCreate: (expense: Expense) => Promise<void>;
  onUpdate: (id: string, expense: Expense) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function ExpenseView({
  expenses,
  onCreate,
  onUpdate,
  onDelete,
}: ExpenseViewProps) {
  return (
    <>
      <ExpenseFormCreate onCreate={onCreate} />
      <ExpenseList
        expenses={expenses}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </>
  );
}
