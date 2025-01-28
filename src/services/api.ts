import axios from 'axios';
import { DataItem, LoginCredentials, User, GridUser } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const TIMEOUT = 5000;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(handleError(error))
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      handleUnauthorized();
    }
    return Promise.reject(handleError(error));
  }
);

const handleError = (error: any): Error => {
  const message =
    error.response?.data?.message || error.message || 'An unexpected error occurred';
  return new Error(message);
};

const handleUnauthorized = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const login = async (credentials: LoginCredentials): Promise<User> => {
    const user = {
      username: credentials.username,
      token: `demo-token-${Date.now()}`
    };
    localStorage.setItem('token', user.token);
    return user;
  
  throw new Error('Invalid credentials');
};

export const fetchUsers = async (): Promise<GridUser[]> => {
  const response = await api.get('/users');
  return response.data;
};

export const fetchPosts = async (): Promise<DataItem[]> => {
  const response = await api.get('/posts');
  return response.data;
};

const getStoredData = <T>(key: string): T[] => {
  const stored = localStorage.getItem(`app_${key}`);
  return stored ? JSON.parse(stored) : [];
};

const setStoredData = <T>(key: string, data: T): void => {
  localStorage.setItem(`app_${key}`, JSON.stringify(data));
};

export const getPosts = async (): Promise<DataItem[]> => {
  try {
    const storedData = getStoredData<DataItem>('posts');
    if (storedData.length > 0) return storedData;

    // Yoksa API'den çek ve localStorage'a kaydet
    const { data } = await api.get<DataItem[]>('/posts');
    const limitedData = data.slice(0, 10);
    setStoredData('posts', limitedData);
    return limitedData;
  } catch (err) {
    throw handleError(err);
  }
};

export const createPost = async (post: Partial<DataItem>): Promise<DataItem> => {
  try {
    const { data } = await api.post<DataItem>('/posts', post);

    const storedData = getStoredData<DataItem>('posts');
    const newId = Math.max(0, ...storedData.map((p) => p.id)) + 1;
    const newPost: DataItem = { ...data, id: newId };

    setStoredData('posts', [...storedData, newPost]);
    return newPost;
  } catch (err) {
    throw handleError(err);
  }
};

export const updatePost = async (post: DataItem): Promise<DataItem> => {
  try {
    await api.put(`/posts/${post.id}`, post);
    const storedData = getStoredData<DataItem>('posts');
    const updatedData = storedData.map((p) => (p.id === post.id ? post : p));
    setStoredData('posts', updatedData);

    return post;
  } catch (err) {
    throw handleError(err);
  }
};

export const deletePost = async (id: number): Promise<void> => {
  try {
    await api.delete(`/posts/${id}`);

    const storedData = getStoredData<DataItem>('posts');
    setStoredData(
      'posts',
      storedData.filter((p) => p.id !== id)
    );
  } catch (err) {
    throw handleError(err);
  }
};

export const createUser = async (user: Partial<GridUser>): Promise<GridUser> => {
  try {
    if (!user.firstName || !user.lastName || !user.email) {
      throw new Error('Required fields are missing');
    }
    const storedData = getStoredData<GridUser>('users');
    const newId = Math.max(0, ...storedData.map((u) => u.id)) + 1;
    const newUser: GridUser = {
      id: newId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role || 'User',
      status: user.status || 'Active',
    };
    setStoredData('users', Array.isArray(storedData) ? [...storedData, newUser] : [newUser]);
    return newUser;
  } catch (err) {
    throw handleError(err);
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    const storedData = getStoredData<GridUser>('users');
    const userToDelete = storedData.find((u) => u.id === id);

    if (!userToDelete) {
      throw new Error('User not found');
    }

    setStoredData(
      'users',
      storedData.filter((u) => u.id !== id)
    );
  } catch (err) {
    throw handleError(err);
  }
};

export const updateUser = async (user: GridUser): Promise<GridUser> => {
  try {
    const storedData = getStoredData<GridUser>('users');
    const existingUser = storedData.find((u) => u.id === user.id);

    if (!existingUser) {
      throw new Error('User not found');
    }

    const updatedData = storedData.map((u) => (u.id === user.id ? user : u));
    setStoredData('users', updatedData);

    return user;
  } catch (err) {
    throw handleError(err);
  }
};
