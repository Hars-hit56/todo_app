export type TodoListStatus = 'All_LIST' | 'ACTIVE' | 'COMPLETED';

export type TodoListData = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

export type TodoOperation = 'EDIT' | 'ADD';
