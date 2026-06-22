"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RutaProtegida from "../../components/RutaProtegida";
import { Producto } from "../../types";

export default function ModuloInventario() {
  const router = useRouter();

  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const datosGuardados = localStorage.getItem("inventarioVeterinaria");
    if (datosGuardados) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProductos(JSON.parse(datosGuardados));
    }
  }, []);
  const [busqueda, setBusqueda] = useState("");
  const [formulario, setFormulario] = useState({
    nombre: "",
    categoria: "",
    codigo: "",
    stock: 0,
    precio: 0,
    fechaVencimiento: "",
  });
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const guardarDatos = (nuevosProductos: Producto[]) => {
    setProductos(nuevosProductos);
    localStorage.setItem("inventarioVeterinaria", JSON.stringify(nuevosProductos));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formulario.nombre || !formulario.codigo) {
      alert("El Nombre y el Código son obligatorios.");
      return;
    }

    if (editandoId) {
      const actualizados = productos.map((p) =>
        p.id === editandoId ? { ...formulario, id: editandoId } : p
      );
      guardarDatos(actualizados);
      setEditandoId(null);
    } else {
      const nuevo: Producto = { ...formulario, id: Date.now().toString() };
      guardarDatos([...productos, nuevo]);
    }
    setFormulario({ nombre: "", categoria: "", codigo: "", stock: 0, precio: 0, fechaVencimiento: "" });
  };

  const editarProducto = (producto: Producto) => {
    setFormulario({
      nombre: producto.nombre,
      categoria: producto.categoria,
      codigo: producto.codigo,
      stock: producto.stock,
      precio: producto.precio,
      fechaVencimiento: producto.fechaVencimiento,
    });
    setEditandoId(producto.id || null);
  };

  const eliminarProducto = (id: string | undefined) => {
    if (!id) return;
    if (confirm("¿Eliminar este producto?")) {
      guardarDatos(productos.filter((p) => p.id !== id));
    }
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.codigo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <RutaProtegida>
      <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", background: "linear-gradient(135deg, #0f766e, #0ea5e9)", minHeight: "100vh" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.8rem", color: "#1e293b" }}>📦 Control de Inventario</h1>
          <button onClick={() => router.push("/dashboard")} style={{ padding: "0.5rem 1rem", backgroundColor: "#64748b", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Volver al Dashboard
          </button>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem" }}>
          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", height: "fit-content" }}>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "#334155" }}>
              {editandoId ? "✏️ Editar Producto" : "➕ Nuevo Producto"}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input type="text" placeholder="Nombre *" value={formulario.nombre} onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })} style={{ padding: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "4px" }} />
              <input type="text" placeholder="Categoría" value={formulario.categoria} onChange={(e) => setFormulario({ ...formulario, categoria: e.target.value })} style={{ padding: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "4px" }} />
              <input type="text" placeholder="Código *" value={formulario.codigo} onChange={(e) => setFormulario({ ...formulario, codigo: e.target.value })} style={{ padding: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "4px" }} />
              <input type="number" placeholder="Stock" value={formulario.stock} onChange={(e) => setFormulario({ ...formulario, stock: Number(e.target.value) })} style={{ padding: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "4px" }} />
              <input type="number" placeholder="Precio" value={formulario.precio} onChange={(e) => setFormulario({ ...formulario, precio: Number(e.target.value) })} style={{ padding: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "4px" }} />
              <input type="date" value={formulario.fechaVencimiento} onChange={(e) => setFormulario({ ...formulario, fechaVencimiento: e.target.value })} style={{ padding: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "4px" }} />
              
              <button type="submit" style={{ padding: "0.75rem", backgroundColor: editandoId ? "#eab308" : "#10b981", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                {editandoId ? "Guardar Cambios" : "Añadir a Inventario"}
              </button>

              {editandoId && (
                <button type="button" onClick={() => { setEditandoId(null); setFormulario({ nombre: "", categoria: "", codigo: "", stock: 0, precio: 0, fechaVencimiento: "" }); }} style={{ padding: "0.5rem", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  Cancelar Edición
                </button>
              )}
            </form>
          </div>

          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <input type="text" placeholder="🔍 Buscar..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", border: "1px solid #cbd5e1", borderRadius: "4px" }} />
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f1f5f9" }}>
                  <th style={{ padding: "0.75rem" }}>Código</th>
                  <th style={{ padding: "0.75rem" }}>Nombre</th>
                  <th style={{ padding: "0.75rem" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "0.75rem" }}>{p.codigo}</td>
                    <td style={{ padding: "0.75rem" }}>{p.nombre}</td>
                    <td style={{ padding: "0.75rem", gap: "0.5rem", display: "flex" }}>
                      <button onClick={() => editarProducto(p)} style={{ cursor: "pointer", background: "none", border: "none" }}>✏️</button>
                      <button onClick={() => eliminarProducto(p.id)} style={{ cursor: "pointer", background: "none", border: "none" }}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RutaProtegida>
  );
}