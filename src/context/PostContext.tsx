import { createContext, ReactNode, useContext } from "react";
import { DataItem } from "../types";
import { useBaseContext } from "../services/baseContext";

const PostContext = createContext<ReturnType<typeof useBaseContext<DataItem>> | null>(null);

export function PostProvider({ children }: { children: ReactNode }) {
  const contextValue = useBaseContext<DataItem>("app_posts");

  return (
    <PostContext.Provider value={contextValue}>
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
}
