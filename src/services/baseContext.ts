import { useState, useEffect } from 'react';

export interface BaseItem {
  id: number;
}

export function useBaseContext<T extends BaseItem>(storageKey: string, defaultItems: T[] = []) {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [items, isLoading]);

  const loadItems = async () => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        setItems(defaultItems);
        localStorage.setItem(storageKey, JSON.stringify(defaultItems));
      }
    } catch (err) {
      console.error(`Error loading ${storageKey}:`, err);
      setItems(defaultItems);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: T) => {
    setItems((prevItems) =>
      prevItems.map((prevItem) => (prevItem.id === item.id ? item : prevItem))
    );
  };

  const handleDelete = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleAdd = (item: Partial<T>) => {
    const newItem = {
      ...item,
      id: Math.max(0, ...items.map((i) => i.id)) + 1,
    } as T;
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return {
    items,
    isLoading,
    handleEdit,
    handleDelete,
    handleAdd,
  };
} 