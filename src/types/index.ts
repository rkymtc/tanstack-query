export interface User {
  username: string;
  token: string;
}

export interface GridUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface DataItem {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface PostContextType {
  posts: DataItem[];
  handleEdit: (item: DataItem) => void;
  handleDelete: (id: number) => void;
  handleAdd: (item: Partial<DataItem>) => void;
  isLoading: boolean;
}

export interface UserContextType {
  users: GridUser[];
  handleEdit: (user: GridUser) => void;
  handleDelete: (id: number) => void;
  handleAdd: (user: Partial<GridUser>) => void;
  isLoading: boolean;
}
