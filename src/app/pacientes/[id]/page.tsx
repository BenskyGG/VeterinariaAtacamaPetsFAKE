"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import RutaProtegida from "../../../components/RutaProtegida";
import { Paciente } from "../../../types";

export default function DetallePaciente() {
  const router = useRouter();
  const params = useParams();
  const idURL = params.id as string;

  const [paciente] = useState<Paciente | null>(() => {
    if (typeof window !== "undefined") {
      const datosGuardados = localStorage.getItem("pacientesVeterinaria");
      if (datosGuardados) {
        const listaPacientes: Paciente[] = JSON.parse(datosGuardados);
        return listaPacientes.find((p) => p.id === idURL) ?? null;
      }
    }
    return null;
  });
  const [cargando] = useState(false);

  return (
    <RutaProtegida>
      <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
        
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", maxWidth: "800px", margin: "0 auto 2rem" }}>
          <h1 style={{ fontSize: "1.8rem", color: "#1e293b" }}>Ficha Médica</h1>
          <button onClick={() => router.push("/pacientes")} style={{ padding: "0.5rem 1rem", backgroundColor: "#64748b", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            ⬅ Volver al Listado
          </button>
        </header>

        <main style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          {cargando ? (
            <p style={{ textAlign: "center", color: "#64748b" }}>Cargando ficha...</p>
          ) : !paciente ? (
            <div style={{ textAlign: "center" }}>
              <h2 style={{ color: "#ef4444" }}>Paciente no encontrado</h2>
              <p style={{ color: "#64748b" }}>El registro que buscas no existe o fue eliminado.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              {/* Encabezado del Perfil */}
              <div style={{ borderBottom: "2px solid #e2e8f0", paddingBottom: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ fontSize: "3rem" }}>🐾</div>
                <div>
                  <h2 style={{ fontSize: "2rem", color: "#0f172a", margin: "0" }}>{paciente.nombre}</h2>
                  <span style={{ backgroundColor: "#e0f2fe", color: "#0284c7", padding: "0.25rem 0.75rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: "bold" }}>
                    ID: {paciente.id}
                  </span>
                </div>
              </div>

              {/* Cuadrícula de Datos */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", color: "#64748b", fontSize: "0.875rem", fontWeight: "bold" }}>Especie</label>
                  <p style={{ margin: "0.25rem 0 0 0", fontSize: "1.1rem", color: "#1e293b" }}>{paciente.especie || "No registrada"}</p>
                </div>
                <div>
                  <label style={{ display: "block", color: "#64748b", fontSize: "0.875rem", fontWeight: "bold" }}>Raza</label>
                  <p style={{ margin: "0.25rem 0 0 0", fontSize: "1.1rem", color: "#1e293b" }}>{paciente.raza || "No registrada"}</p>
                </div>
                <div>
                  <label style={{ display: "block", color: "#64748b", fontSize: "0.875rem", fontWeight: "bold" }}>Edad</label>
                  <p style={{ margin: "0.25rem 0 0 0", fontSize: "1.1rem", color: "#1e293b" }}>{paciente.edad || "No registrada"}</p>
                </div>
                <div>
                  <label style={{ display: "block", color: "#64748b", fontSize: "0.875rem", fontWeight: "bold" }}>RUT del Dueño</label>
                  <p style={{ margin: "0.25rem 0 0 0", fontSize: "1.1rem", color: "#1e293b", fontWeight: "bold" }}>{paciente.rutDueno}</p>
                </div>
              </div>

              {/* Nota Médica (Ocupa el ancho completo) */}
              <div style={{ backgroundColor: "#f8fafc", padding: "1rem", borderRadius: "6px", border: "1px solid #e2e8f0", marginTop: "1rem" }}>
                <label style={{ display: "block", color: "#64748b", fontSize: "0.875rem", fontWeight: "bold", marginBottom: "0.5rem" }}>📝 Nota Médica / Motivo de Registro</label>
                <p style={{ margin: "0", color: "#334155", lineHeight: "1.5" }}>
                  {paciente.notaMedica || "Sin observaciones adicionales."}
                </p>
              </div>

            </div>
          )}
        </main>
      </div>
    </RutaProtegida>
  );
}