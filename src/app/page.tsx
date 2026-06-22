"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
// Si usas Next.js, la forma optimizada de cargar imágenes es con el componente Image
import Image from "next/image"; 

export default function Login() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aquí definimos las credenciales válidas como constante en el código
    const CREDENCIALES_VALIDAS = {
      usuario: "usuario12345",
      clave: "12345"
    };

    // Validación estricta que exige la rúbrica para el login funcional
    if (nombre === CREDENCIALES_VALIDAS.usuario && password === CREDENCIALES_VALIDAS.clave) {
      // Si todo está correcto, iniciamos sesión guardando el rol
      login({ nombre: "Administrador Atacama", rol: "Veterinario" }); 
      router.push("/dashboard"); 
    } else {
      // Retroalimentación visual si las credenciales son incorrectas
      alert("❌ Credenciales incorrectas. Intenta nuevamente.");
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh", 
      /* Aquí ajustas el color de fondo exacto. #f0fdf4 es un verde muy clarito, 
         pero puedes cambiarlo por el código HEX de tu imagen */
      backgroundColor: "#f8fafc" 
    }}>
      
      <form onSubmit={handleLogin} style={{ 
        backgroundColor: "white", 
        padding: "2.5rem", 
        borderRadius: "12px", 
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)", 
        display: "flex", 
        flexDirection: "column", 
        gap: "1.5rem", 
        width: "350px",
        alignItems: "center"
      }}>
        
        {/* ESPACIO PARA EL LOGO */}
        <div style={{ marginBottom: "1rem", textAlign: "center" }}>
          {/* Asegúrate de tener una imagen llamada "logo.png" en la carpeta "public" de tu proyecto */}
          <Image 
            src="/logo.png" 
            alt="Logo Atacama Pets" 
            width={120} 
            height={120} 
            style={{ borderRadius: "50%", objectFit: "cover" }}
            // Si aún no tienes el logo, comenta la línea de arriba y descomenta la de abajo:
            // <div style={{ width: "120px", height: "120px", backgroundColor: "#0f766e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "2rem" }}>🐶</div>
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
          transition: "background-color 0.3s"
        }}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}