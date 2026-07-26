import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import axios from 'axios';
import { auth, googleProvider, signInWithPopup, signOut as firebaseSignOut } from '../lib/firebase';
import { useNavigate } from '@tanstack/react-router';

// Create Axios instance with credentials (for cookies)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5050/api/v1',
  withCredentials: true, // Important for sending/receiving HttpOnly cookies
});

type User = {
  id: string;
  name: string;
  email: string;
  profileCompleted: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  googleSignIn: (accessToken: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Note: we can use the router via hook, but here it's an AuthProvider.
  // Instead, we will handle redirects inside components or pass navigate to the hook functions.

  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get('/auth/me');
      setUser({
        id: res.data.user._id,
        name: `${res.data.user.firstName} ${res.data.user.lastName}`,
        email: res.data.user.email,
        profileCompleted: res.data.user.profileCompleted,
      });
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (data: any) => {
    const res = await api.post('/auth/login', data);
    setUser(res.data.user);
  };

  const register = async (data: any) => {
    const res = await api.post('/auth/register', data);
    setUser(res.data.user);
  };

  const googleSignIn = async (accessToken: string) => {
    try {
      const res = await api.post('/auth/google', { accessToken });
      setUser(res.data.user);
    } catch (error) {
      console.error('Google Sign In Error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (data: any) => {
    const res = await api.put('/auth/profile', data);
    setUser((prev) => prev ? { ...prev, profileCompleted: res.data.user.profileCompleted } : null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleSignIn, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
