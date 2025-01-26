import { createContext } from "react";
import { PostContextType, UserContextType, User } from "../types";

export const AuthContext = createContext<{
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
} | null>(null);

export const PostContext = createContext<PostContextType | undefined>(undefined);
export const UserContext = createContext<UserContextType | undefined>(undefined); 