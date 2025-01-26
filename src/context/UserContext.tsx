import { createContext, ReactNode, useContext, useState } from "react";
import { GridUser } from "../types";

interface UserContextType {
  users: GridUser[];
  handleAdd: (user: GridUser) => void;
  handleEdit: (user: GridUser) => void;
  handleDelete: (id: number) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<GridUser[]>([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active"
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 3,
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob@example.com",
      role: "Editor",
      status: "Inactive",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = (user: GridUser) => {
    setIsLoading(true);
    setTimeout(() => {
      setUsers(prev => [...prev, user]);
      setIsLoading(false);
    }, 500);
  };

  const handleEdit = (updatedUser: GridUser) => {
    setIsLoading(true);
    setTimeout(() => {
      setUsers(prev => prev.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ));
      setIsLoading(false);
    }, 500);
  };

  const handleDelete = (id: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setUsers(prev => prev.filter(user => user.id !== id));
      setIsLoading(false);
    }, 500);
  };

  return (
    <UserContext.Provider value={{ users, handleAdd, handleEdit, handleDelete, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
