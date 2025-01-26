import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../services/api";
import { DataItem } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com";

export const useGetItems = () => {
  return useQuery<DataItem[]>({
    queryKey: ["items"],
    queryFn: () => apiService.getPosts(),
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newItem: Partial<DataItem>) => apiService.createPost(newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedItem: DataItem) => apiService.updatePost(updatedItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export function usePosts() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<DataItem[]> => {
      const response = await fetch(`${API_URL}/posts`);
      return response.json();
    }
  });

  const addPost = useMutation({
    mutationFn: async (newPost: Partial<DataItem>): Promise<DataItem> => {
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: { "Content-Type": "application/json" }
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });

  const updatePost = useMutation({
    mutationFn: async (post: DataItem): Promise<DataItem> => {
      const response = await fetch(`${API_URL}/posts/${post.id}`, {
        method: "PUT",
        body: JSON.stringify(post),
        headers: { "Content-Type": "application/json" }
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });

  const deletePost = useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });

  return {
    posts: postsQuery.data ?? [],
    isLoading: postsQuery.isLoading,
    addPost,
    updatePost,
    deletePost
  };
}
