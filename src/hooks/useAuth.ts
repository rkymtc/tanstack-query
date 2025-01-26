import { useMutation } from "@tanstack/react-query";
import { LoginCredentials, User } from "../types";

export function useAuth() {
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<User> => {
 
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (credentials.username === "admin" && credentials.password === "admin") {
        const user: User = {
          username: credentials.username,
          token: "simulated-jwt-token"
        };
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      }
      throw new Error("Invalid credentials");
    }
  });

  return loginMutation;
} 