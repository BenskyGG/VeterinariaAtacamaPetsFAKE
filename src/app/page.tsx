"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import Image from "next/image";

export default function Login() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const CREDENCIALES_VALIDAS = {
      usuario: "usuario12345",
      clave: "12345"
    };

    if (nombre === CREDENCIALES_VALIDAS.usuario && password === CREDENCIALES_VALIDAS.clave) {
      login({ nombre: "Administrador Atacama", rol: "Veterinario" });
      router.push("/dashboard");
    } else {
      alert("Credenciales incorrectas. Usuario: usuario12345 / Contraseña: 12345");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f766e, #0ea5e9)",
      fontFamily: "Arial, sans-serif",
    }}>
      <form onSubmit={handleLogin} style={{
        backgroundColor: "white",
        padding: "2.5rem",
        borderRadius: "12px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        width: "350px",
        alignItems: "center"
      }}>
        <div style={{ marginBottom: "1rem", textAlign: "center" }}>
          <Image
            src="/logo.png"
            alt="Logo Atacama Pets"
            width={120}
            height={120}
            style={{ objectFit: "contain" }}
          />
          <h2 style={{ color: "#0f766e", marginTop: "1rem", fontSize: "1.5rem" }}>Atacama Pets</h2>
          <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>Intranet Veterinaria</p>
        </div>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.9rem", color: "#334155", fontWeight: "bold" }}>Usuario</label>
          <input
            type="text"
            placeholder="Ej: usuario12345"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", width: "100%", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.9rem", color: "#334155", fontWeight: "bold" }}>Contraseña</label>
          <input
            type="password"
            placeholder="Ej: 12345"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", width: "100%", boxSizing: "border-box" }}
          />
        </div>

        <button type="submit" style={{
          padding: "0.75rem",
          backgroundColor: "#0f766e",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "1rem",
          width: "100%",
          marginTop: "0.5rem",
        }}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
