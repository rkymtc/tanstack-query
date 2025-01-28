import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginCredentials } from "../types";
import * as apiService from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/contexts";

export function useAuth() {
  const queryClient = useQueryClient();
  const { login } = useContext(AuthContext);

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const user = await apiService.login(credentials);
      login(user);
      return user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credentials"] });
    }
  });

  return loginMutation;
}