// src/context/AuthContext.tsx
"use client"; // CRÍTICO: Le dice a Next.js que este código se ejecuta en el navegador (para poder usar localStorage)

import { createContext, useState, useEffect, ReactNode } from "react";
import { Usuario } from "../types";

// 1. Definimos qué funciones y datos estarán disponibles en toda la app
interface AuthContextType {
  user: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

// 2. Creamos el contexto (arranca vacío por defecto)
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

// 3. Creamos el "Proveedor": El componente que envolverá nuestra aplicación
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // useState controla el estado del usuario en tiempo real
  const [user, setUser] = useState<Usuario | null>(null);

  // useEffect se ejecuta UNA vez al cargar la página
  // Su trabajo es buscar si alguien ya había iniciado sesión antes
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    if (usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado)); // Transforma el texto guardado de vuelta a un objeto
    }
  }, []);

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