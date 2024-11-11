import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AccountInfo } from "../data/types";
import { getToken, getAccountInfo } from "../hooks/authService";
import LoadingLoader from "../components/loaders/Loading";

//========================== Auth Context Interface
interface AuthContextType {
  isAuthenticated: boolean;
  accountInfo: AccountInfo | null;
  isLoading: boolean;
  loginHandle: (accountInfo: AccountInfo) => void;
  logoutHandle: () => void;
}

// ========================== Implement
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      try {
        const token = getToken();
        const storedAccountInfo = getAccountInfo();

        if (token && storedAccountInfo) {
          setIsAuthenticated(true);
          setAccountInfo(storedAccountInfo);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false); // Kết thúc loading state khi đã kiểm tra xong
      }
    };

    initAuth();
  }, []);

  const loginHandle = (newAccountInfo: AccountInfo) => {
    setIsAuthenticated(true);
    setAccountInfo(newAccountInfo);
  };

  const logoutHandle = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setAccountInfo(null);
  };

  // Không render children cho đến khi đã kiểm tra xong auth state
  if (isLoading) {
    return <div><LoadingLoader displayText="Đang Xử Lý"/></div>; // Hoặc loading spinner của bạn
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accountInfo,
        isLoading,
        loginHandle,
        logoutHandle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
