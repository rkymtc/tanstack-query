import axios, { AxiosInstance } from 'axios';
import { DataItem, LoginCredentials, User, GridUser } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const TIMEOUT = 10000;

class ApiService {
  private api: AxiosInstance;
  
  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      timeout: TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

 
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (credentials.username === "admin" && credentials.password === "admin") {
        const user: User = {
          username: credentials.username,
          token: "simulated-jwt-token"
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", user.token);
        return user;
      }
      throw new Error("Invalid credentials");
    } catch (err) {
      throw new Error(`Login failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }

  async getPosts(): Promise<DataItem[]> {
    try {
      const storedData = this.getStoredData<DataItem>('posts');
      if (storedData.length > 0) return storedData;

      const { data } = await this.api.get<DataItem[]>('/posts');
      const limitedData = data.slice(0, 10);
      this.setStoredData('posts', limitedData);
      return limitedData;
    } catch (err) {
      throw new Error(`Failed to fetch posts: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }

  async createPost(post: Partial<DataItem>): Promise<DataItem> {
    try {
      const { data } = await this.api.post<DataItem>('/posts', post);
      const storedData = this.getStoredData<DataItem>('posts');
      const newPost = { ...data, id: Math.max(0, ...storedData.map(p => p.id)) + 1 };
      this.setStoredData('posts', [...storedData, newPost]);
      return newPost;
    } catch (err) {
      throw new Error(`Failed to create post: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }

  async updatePost(post: DataItem): Promise<DataItem> {
    try {
      await this.api.put(`/posts/${post.id}`, post);
      const storedData = this.getStoredData<DataItem>('posts');
      const updatedData = storedData.map(p => p.id === post.id ? post : p);
      this.setStoredData('posts', updatedData);
      return post;
    } catch (err) {
      throw new Error(`Failed to update post: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }

  async deletePost(id: number): Promise<void> {
    try {
      await this.api.delete(`/posts/${id}`);
      const storedData = this.getStoredData<DataItem>('posts');
      this.setStoredData('posts', storedData.filter(p => p.id !== id));
    } catch (err) {
      throw new Error(`Failed to delete post: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }

 
  async getUsers(): Promise<GridUser[]> {
    try {
      const storedData = this.getStoredData<GridUser>('users');
      if (storedData.length > 0) return storedData;
      return this.getDefaultUsers();
    } catch (err) {
      throw new Error(`Failed to fetch users: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }

  async createUser(user: Partial<GridUser>): Promise<GridUser> {
    try {
      const storedData = this.getStoredData<GridUser>('users');
      const newUser: GridUser = {
        id: Math.max(0, ...storedData.map(u => u.id)) + 1,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        role: user.role || 'User',
        status: user.status || 'Active',
      };
      this.setStoredData('users', [...storedData, newUser]);
      return newUser;
    } catch (err) {
      throw new Error(`Failed to create user: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }

  async updateUser(user: GridUser): Promise<GridUser> {
    try {
      const storedData = this.getStoredData<GridUser>('users');
      const updatedData = storedData.map(u => u.id === user.id ? user : u);
      this.setStoredData('users', updatedData);
      return user;
    } catch (err) {
      throw new Error(`Failed to update user: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      const storedData = this.getStoredData<GridUser>('users');
      this.setStoredData('users', storedData.filter(u => u.id !== id));
    } catch (err) {
      throw new Error(`Failed to delete user: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }


  private getStoredData<T>(key: string): T[] {
    const stored = localStorage.getItem(`app_${key}`);
    return stored ? JSON.parse(stored) as T[] : [];
  }

  private setStoredData<T>(key: string, data: T[]): void {
    localStorage.setItem(`app_${key}`, JSON.stringify(data));
  }

  private getDefaultUsers(): GridUser[] {
    const defaultUsers: GridUser[] = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
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
    ];
    this.setStoredData('users', defaultUsers);
    return defaultUsers;
  }
}

export const apiService = new ApiService(); 