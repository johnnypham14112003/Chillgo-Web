//Library
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import { User, onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "../firebase.config";

//====================================================================
//Public Declare
type Role = 'Admin' | 'Nhân Viên Quản Lý' | 'Đối Tác' | 'Hướng Dẫn Viên' | 'Người Dùng' | null;
interface AuthContextType {
  user: User | null;
  idToken: string | null;
  role: Role;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  idToken: null,
  role: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

//====================================================================
//Public Function
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [role, setRole] = useState<Role>(null);

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const token = await getIdToken(currentUser);
        setIdToken(token);
        // Giả sử bạn lưu role trong user claims hoặc trong một nơi khác
        // Ở đây bạn cần thực hiện logic để lấy role thực tế của user
        const userRole = await fetchUserRole(currentUser.uid);
        setRole(userRole);
      } else {
        setIdToken(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    // Implement login logic
  };

  const signup = async (email: string, password: string) => {
    // Implement signup logic
  };

  const logout = async () => {
    // Implement logout logic
  };

  return (
    <AuthContext.Provider value={{ user, idToken, role, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Hàm này cần được implement để lấy role của user từ backend hoặc Firebase
async function fetchUserRole(uid: string): Promise<Role> {
  // Implement logic to fetch user role
  return 'User';
}