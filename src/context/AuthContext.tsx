"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
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
  const [user, setUser] = useState<Usuario | null>(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    if (usuarioGuardado) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = (usuario: Usuario) => {
    setUser(usuario);
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("usuarioLogueado");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
