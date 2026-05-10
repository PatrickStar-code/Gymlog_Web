"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id?: string;
  name?: string;
  email: string;
  // Others
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User, redirectPath?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("gymlog_token");
    const storedUser = localStorage.getItem("gymlog_user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string, userData: User, redirectPath: string = "/GymLog/dashboard") => {
    localStorage.setItem("gymlog_token", newToken);
    localStorage.setItem("gymlog_user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    router.push(redirectPath);
  };

  const logout = () => {
    localStorage.removeItem("gymlog_token");
    localStorage.removeItem("gymlog_user");
    setToken(null);
    setUser(null);
    router.push("/GymLog/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
