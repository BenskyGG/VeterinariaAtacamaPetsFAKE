"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f766e, #0ea5e9)", fontFamily: "Arial, sans-serif" }}>
      <style>{`
        .card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          cursor: pointer;
          transition: transform 0.2s, border-color 0.2s;
          border: 2px solid transparent;
        }
        .card:hover {
          transform: translateY(-4px);
        }
        .card-pacientes:hover { border-color: #10b981; }
        .card-inventario:hover { border-color: #eab308; }
      `}</style>

      <header style={{
        backgroundColor: "#0f766e",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <h1 style={{ fontSize: "1.5rem", margin: 0 }}>🐾 Atacama Pets</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "0.9rem" }}>
            {user?.nombre ?? "Usuario"} ({user?.rol ?? "sin rol"})
          </span>
          <button onClick={handleLogout} style={{
            padding: "0.4rem 1rem",
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: "4px",
            cursor: "pointer",
          }}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main style={{ padding: "3rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ color: "#1e293b", marginBottom: "2rem" }}>Panel Principal</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div className="card card-pacientes" onClick={() => router.push("/pacientes")}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🐶</div>
            <h3 style={{ margin: "0 0 0.5rem", color: "#0f172a" }}>Gestión de Pacientes</h3>
            <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>
              Registrar, editar y consultar mascotas
            </p>
          </div>

          <div className="card card-inventario" onClick={() => router.push("/inventario")}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📦</div>
            <h3 style={{ margin: "0 0 0.5rem", color: "#0f172a" }}>Control de Inventario</h3>
            <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>
              Administrar productos y stock
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
