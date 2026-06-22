"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RutaProtegida from "../../components/RutaProtegida";
import { Paciente } from "../../types";

export default function ModuloPacientes() {
  const router = useRouter();

  // ================= ESTADOS (useState) =================
  // Lista total de pacientes guardados
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  // Texto para buscar pacientes por nombre
  const [busqueda, setBusqueda] = useState("");
  
  // Estado para el formulario (Los 6 campos requeridos)
  const [formulario, setFormulario] = useState({
    nombre: "", especie: "", raza: "", edad: "", rutDueno: "", notaMedica: ""
  });
  // Si tiene un ID, significa que estamos EDITANDO. Si es null, estamos CREANDO.
  const [editandoId, setEditandoId] = useState<string | null>(null);

  // ================= EFECTOS (useEffect) =================
  // Carga inicial: Busca los datos en localStorage cuando la página se abre por primera vez
  useEffect(() => {
    const datosGuardados = localStorage.getItem("pacientesVeterinaria");
    if (datosGuardados) {
      setPacientes(JSON.parse(datosGuardados));
    }
  }, []);

  // ================= FUNCIONES CRUD =================
  // Función para guardar los cambios en el estado y en localStorage al mismo tiempo
  const guardarDatos = (nuevosPacientes: Paciente[]) => {
    setPacientes(nuevosPacientes);
    localStorage.setItem("pacientesVeterinaria", JSON.stringify(nuevosPacientes));
  };

  // CREAR o ACTUALIZAR paciente
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica: que al menos el nombre y el RUT no estén vacíos
    if (!formulario.nombre || !formulario.rutDueno) {
      alert("El Nombre y el RUT del dueño son obligatorios.");
      return;
    }

    if (editandoId) {
      // MODO EDICIÓN: Buscamos el paciente y lo reemplazamos
      const pacientesActualizados = pacientes.map((paciente) =>
        paciente.id === editandoId ? { ...formulario, id: editandoId } : paciente
      );
      guardarDatos(pacientesActualizados);
      setEditandoId(null); // Salimos del modo edición
    } else {
      // MODO CREACIÓN: Generamos un ID nuevo y lo agregamos a la lista
      const nuevoPaciente: Paciente = {
        ...formulario,
        id: Date.now().toString(), // Genera un ID único basado en la hora actual
      };
      guardarDatos([...pacientes, nuevoPaciente]);
    }

    // Limpiamos el formulario
    setFormulario({ nombre: "", especie: "", raza: "", edad: "", rutDueno: "", notaMedica: "" });
  };

  // PREPARAR EDICIÓN: Carga los datos del paciente en el formulario
  const editarPaciente = (paciente: Paciente) => {
    setFormulario(paciente);
    setEditandoId(paciente.id);
  };

  // ELIMINAR paciente
  const eliminarPaciente = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este paciente?")) {
      const pacientesRestantes = pacientes.filter((paciente) => paciente.id !== id);
      guardarDatos(pacientesRestantes);
    }
  };

  // ================= RENDERIZADO =================
  // Filtro en tiempo real: Solo muestra los pacientes que coincidan con la búsqueda
  const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // >>> ¡AQUÍ ESTÁ EL CAMBIO IMPORTANTE! <<<
  // Quitamos la etiqueta <RutaProtegida> para que puedas testear libremente el CRUD.
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.8rem", color: "#1e293b" }}>🐶 Gestión de Pacientes</h1>
        <button onClick={() => router.push("/dashboard")} style={{ padding: "0.5rem 1rem", backgroundColor: "#64748b", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Volver al Dashboard
        </button>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem" }}>
        
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", height: "fit-content" }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "#334155" }}>
            {editandoId ? "✏️ Editar Paciente" : "➕ Nuevo Paciente"}
          </h2>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input type="text" placeholder="Nombre de la mascota *" value={formulario.nombre} onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })} style={{ padding: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "4px" }} />
            <input type="text" placeholder="Especie (Ej: Perro, Gato)" value={formulario.especie} onChange={(e) => setFormulario({ ...formulario, especie: e.target.value })} style={{ padding: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "4px" }} />
            <input type="text" placeholder="Raza" value={formulario.raza} onChange={(e) => setFormulario({ ...formulario, raza: e.target.value })} style={{ padding: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "4px" }} />
            <input type="text" placeholder="Edad" value={formulario.edad} onChange={(e) => setFormulario({ ...formulario, edad: e.target.value })} style={{ padding: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "4px" }} />
            <input type="text" placeholder="RUT del Dueño *" value={formulario.rutDueno} onChange={(e) => setFormulario({ ...formulario, rutDueno: e.target.value })} style={{ padding: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "4px" }} />
            <textarea placeholder="Nota médica o motivo de registro" value={formulario.notaMedica} onChange={(e) => setFormulario({ ...formulario, notaMedica: e.target.value })} style={{ padding: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "4px", minHeight: "80px" }} />
            
            <button type="submit" style={{ padding: "0.75rem", backgroundColor: editandoId ? "#eab308" : "#3b82f6", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>
              {editandoId ? "Guardar Cambios" : "Registrar Mascota"}
            </button>
            
            {editandoId && (
              <button type="button" onClick={() => { setEditandoId(null); setFormulario({ nombre: "", especie: "", raza: "", edad: "", rutDueno: "", notaMedica: "" }); }} style={{ padding: "0.5rem", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                Cancelar Edición
              </button>
            )}
          </form>
        </div>

        {/* COLUMNA DERECHA: LISTADO Y BUSCADOR */}
        <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.2rem", color: "#334155" }}>Listado General</h2>
            
            {/* BUSCADOR */}
            <input 
              type="text" 
              placeholder="🔍 Buscar por nombre..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{ padding: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "4px", width: "250px" }}
            />
          </div>

          {/* TABLA DE PACIENTES */}
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#f1f5f9", borderBottom: "2px solid #cbd5e1" }}>
                <th style={{ padding: "0.75rem" }}>Nombre</th>
                <th style={{ padding: "0.75rem" }}>Especie</th>
                <th style={{ padding: "0.75rem" }}>RUT Dueño</th>
                <th style={{ padding: "0.75rem" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientesFiltrados.length === 0 ? (
                <tr><td colSpan={4} style={{ padding: "1rem", textAlign: "center", color: "#64748b" }}>No hay pacientes registrados.</td></tr>
              ) : (
                pacientesFiltrados.map((paciente) => (
                  <tr key={paciente.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "0.75rem", fontWeight: "bold", color: "#0f172a" }}>{paciente.nombre}</td>
                    <td style={{ padding: "0.75rem" }}>{paciente.especie}</td>
                    <td style={{ padding: "0.75rem" }}>{paciente.rutDueno}</td>
                    <td style={{ padding: "0.75rem", display: "flex", gap: "0.5rem" }}>
                      <button onClick={() => router.push(`/pacientes/${paciente.id}`)} style={{ padding: "0.25rem 0.5rem", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" }}>👁️ Ver Detalle</button>
                      <button onClick={() => editarPaciente(paciente)} style={{ padding: "0.25rem 0.5rem", backgroundColor: "#eab308", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" }}>✏️ Editar</button>
                      <button onClick={() => eliminarPaciente(paciente.id)} style={{ padding: "0.25rem 0.5rem", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" }}>🗑️ Borrar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}