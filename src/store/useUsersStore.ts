import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateUsers } from '@/app/[locale]/users/usersData';

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  avatar: string;
  status: string;
}

interface UsersStore {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (username: string, updatedData: Partial<User>) => void;
  deleteUser: (username: string) => void;
  getUserByUsername: (username: string) => User | undefined;
}

export const useUsersStore = create<UsersStore>()(
  persist(
    (set, get) => ({
      users: generateUsers(),
      
      addUser: (user) => 
        set((state) => ({ users: [...state.users, user] })),
      
      updateUser: (username, updatedData) => 
        set((state) => ({
          users: state.users.map((user) =>
            user.username === username ? { ...user, ...updatedData } : user
          ),
        })),
      
      deleteUser: (username) => 
        set((state) => ({
          users: state.users.filter((user) => user.username !== username),
        })),
      
      getUserByUsername: (username) => 
        get().users.find((user) => user.username === username),
    }),
    {
      name: 'users-storage',
      storage: {
        getItem: (name) => {
          // Check if running in browser
          if (typeof window !== 'undefined') {
            const str = localStorage.getItem(name);
            return str ? JSON.parse(str) : null;
          }
          return null;
        },
        setItem: (name, value) => {
          // Check if running in browser
          if (typeof window !== 'undefined') {
            localStorage.setItem(name, JSON.stringify(value));
          }
        },
        removeItem: (name) => {
          // Check if running in browser
          if (typeof window !== 'undefined') {
            localStorage.removeItem(name);
          }
        },
      },
    }
  )
);
