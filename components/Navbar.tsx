'use client'

import { useState, useContext } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "@/app/context/AuthContext";

export const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#1E3A8A] text-white fixed z-50 w-full shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          PetroHub
        </Link>

        {/* Menú en pantallas grandes */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:underline">Inicio</Link>
          {!isAuthenticated ? (
            <Link href="/login" className="hover:underline">Ingresar/Registrarse</Link>
          ) : (
            <>
              <Link href="/upload" className="hover:underline">Subir Documento</Link>
              <button onClick={logout} className="hover:underline">Cerrar Sesión</button>
            </>
          )}
        </nav>

        {/* Botón de menú en dispositivos pequeños */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Menú desplegable en móviles */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 text-white p-4 flex flex-col space-y-2">
          <Link href="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
          {!isAuthenticated ? (
            <Link href="/login" onClick={() => setMenuOpen(false)}>Ingresar/Registrarse</Link>
          ) : (
            <>
              <Link href="/upload" onClick={() => setMenuOpen(false)}>Subir Documento</Link>
              <button onClick={() => { logout(); setMenuOpen(false); }}>Cerrar Sesión</button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
