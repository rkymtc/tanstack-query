import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiService from "../services/api";
import { DataItem } from "../types";

export function useApi() {
  const queryClient = useQueryClient();

  const postsQuery = useQuery<DataItem[]>({
    queryKey: ["posts"],
    queryFn: () => apiService.getPosts(), 
  });

  const addPost = useMutation({
    mutationFn: (newPost: Partial<DataItem>) => apiService.createPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updatePost = useMutation({
    mutationFn: (post: DataItem) => apiService.updatePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const deletePost = useMutation({
    mutationFn: (id: number) => apiService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    posts: postsQuery.data ?? [],
    isLoading: postsQuery.isLoading,
    error: postsQuery.error,
    addPost,
    updatePost,
    deletePost,
  };
}
