import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN, LOGOUT, CREATE_USER } from '@/graphql/mutations';

interface User {
  id: string;
  email: string;
  fullName?: string;
  isActive: boolean;
  dateJoined: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [loginMutation] = useMutation(LOGIN);
  const [logoutMutation] = useMutation(LOGOUT);
  const [signupMutation] = useMutation(CREATE_USER);

  useEffect(() => {
    // Check if user is logged in (you might want to add a query to check current user)
    // For now, we'll assume no persistent login
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({ variables: { email, password } });
      if (data?.login?.user) {
        setUser(data.login.user);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation();
      setUser(null);
    } catch (error) {
      // Even if logout fails, clear local state
      setUser(null);
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const { data } = await signupMutation({ variables: { email, password } });
      if (data?.createUser?.user) {
        setUser(data.createUser.user);
      }
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
