// src/context/AuthContext.tsx
"use client"; // CRÍTICO: Le dice a Next.js que este código se ejecuta en el navegador (para poder usar localStorage)

import { createContext, useState, ReactNode } from "react";
import { Usuario } from "../types";

interface AuthContextType {
  user: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(() => {
    if (typeof window !== "undefined") {
      const usuarioGuardado = localStorage.getItem("usuarioLogueado");
      return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
    }
    return null;
  });

  // Función para iniciar sesión
  const login = (usuario: Usuario) => {
    setUser(usuario);
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuario)); // Guarda en la memoria del navegador
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("usuarioLogueado"); // Borra la memoria
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};