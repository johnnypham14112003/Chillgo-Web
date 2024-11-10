import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AccountInfo } from '../data/types';
import { getToken, getAccountInfo } from '../hooks/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  accountInfo: AccountInfo | null;
  login: (accountInfo: AccountInfo) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);

  useEffect(() => {
    // Kiểm tra authentication khi component mount
    const token = getToken();
    const storedAccountInfo = getAccountInfo();
    
    if (token && storedAccountInfo) {
      setIsAuthenticated(true);
      setAccountInfo(storedAccountInfo);
    }
  }, []);

  const login = (newAccountInfo: AccountInfo) => {
    setIsAuthenticated(true);
    setAccountInfo(newAccountInfo);
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setAccountInfo(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, accountInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};