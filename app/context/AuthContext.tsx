'use client'

import { useRouter } from "next/navigation";
import { createContext, useState, useEffect, ReactNode } from "react";

// Definimos la estructura del contexto
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
}

// Creamos el contexto con un valor por defecto
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  token: null,
});

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Cargar estado de autenticación desde localStorage al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      setToken(storedToken)
    }
  }, [token]);

  // Función para iniciar sesión
  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setToken(token);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setToken(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
