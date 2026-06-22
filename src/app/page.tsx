"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (nombre === "admin" && password === "123456") {
      login({ nombre: "Admin", rol: "veterinario" });
      router.push("/dashboard");
    } else if (nombre === "user" && password === "123456") {
      login({ nombre: "Usuario", rol: "asistente" });
      router.push("/dashboard");
    } else {
      setError("Credenciales incorrectas. Usa admin/123456 o user/123456.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0f766e, #0ea5e9)",
      fontFamily: "Arial, sans-serif",
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "2.5rem",
        borderRadius: "12px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
        width: "100%",
        maxWidth: "400px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.8rem", color: "#0f172a", margin: 0 }}>🐾 Atacama Pets</h1>
          <p style={{ color: "#64748b", margin: "0.5rem 0 0" }}>Sistema de Gestión Veterinaria</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Usuario"
            value={nombre}
            onChange={(e) => { setNombre(e.target.value); setError(""); }}
            style={{
              padding: "0.75rem",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "1rem",
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            style={{
              padding: "0.75rem",
              border: "1px solid #cbd5e1",
              borderRadius: "6px",
              fontSize: "1rem",
            }}
          />

          {error && (
            <p style={{ color: "#ef4444", fontSize: "0.875rem", margin: 0 }}>{error}</p>
          )}

          <button type="submit" style={{
            padding: "0.75rem",
            backgroundColor: "#0f766e",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}>
            Iniciar Sesión
          </button>
        </form>

        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "0.8rem", marginTop: "1.5rem" }}>
          Demo: admin/123456 · user/123456
        </p>
      </div>
    </div>
  );
}
