import type { Metadata } from "next";
import { AuthProvider } from "../context/AuthContext";
import "./globals.css"; // Mantiene los estilos globales si decides usar CSS

export const metadata: Metadata = {
  title: "Atacama Pets - Intranet",
  description: "Sistema de gestión veterinaria",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {/* Aquí envolvemos toda la app para que el contexto sea global */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}