// src/types/index.ts

// Definimos la estructura del Usuario que iniciará sesión
export interface Usuario {
  nombre: string;
  rol: string;
}

// Los 6 campos del Paciente (más un ID único necesario para el CRUD)
export interface Paciente {
  id: string; 
  nombre: string;
  especie: string;
  raza: string;
  edad: string;
  rutDueno: string;
  notaMedica: string;
}

// Los 6 campos del Producto (más un ID único)
export interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  codigo: string;
  stock: number;
  precio: number;
  fechaVencimiento: string;
}