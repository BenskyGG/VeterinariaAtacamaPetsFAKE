"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function RutaProtegida({ children }: { children: React.ReactNode }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Si la página carga y NO hay usuario, lo devolvemos al login ("/")
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  // Si no hay usuario, no mostramos nada mientras redirige
  if (!user) return null;

  // Si hay usuario, mostramos el contenido de la intranet
  return <>{children}</>;
}