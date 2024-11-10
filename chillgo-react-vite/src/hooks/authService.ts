import {
  AccountInfo,
  LoginPayload,
  LoginResponse,
  SignupPayload,
} from "../data/types";

//==========================================================
//=====================[ Declare ]======================
const Server_URL = import.meta.env.VITE_SERVER_URL;

//==========================================================
//=====================[] Local Storage ]======================
export const setToken = (token: string) => {
  localStorage.setItem("jwt-token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("jwt-token");
};
//==========================================================

// Lưu thông tin account vào localStorage
export const setAccountInfo = (accountInfo: AccountInfo) => {
  localStorage.setItem("account-info", JSON.stringify(accountInfo));
};

// Lấy thông tin account từ localStorage
export const getAccountInfo = (): AccountInfo | null => {
  const accountInfo = localStorage.getItem("account-info");
  return accountInfo ? JSON.parse(accountInfo) : null;
};

// Xóa thông tin authentication khi logout
export const clearAuth = () => {
  localStorage.removeItem("jwt-token");
  localStorage.removeItem("account-info");
};

// Hàm signup
export const signupMethod = async (payload: SignupPayload): Promise<Response> => {
  try {
    const response = await fetch(`${Server_URL}/accounts/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

// Hàm login
export const loginMethod = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${Server_URL}/api/accounts/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      alert(`Đã có lỗi xảy ra: ${response.body}`);
      throw new Error("Login failed");
    }

    const data: LoginResponse = await response.json();

    // Lưu token và account info vào localStorage
    setToken(data["jwt-token"]);
    setAccountInfo(data["account-info"]);

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Hàm tạo authenticated request
export const createAuthenticatedRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    return response;
  } catch (error) {
    console.error("Request error:", error);
    throw error;
  }
};
