// Expense Interface
export interface Expense {
  _id?: string;
  title: string;
  amount: number;
  date: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
