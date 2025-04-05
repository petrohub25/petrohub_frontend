'use client'

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AuthContext } from "@/app/context/AuthContext";
import { TextField, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";

const Login = () => {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  // Estado del formulario
  const [mode, setMode] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Manejo de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Cambio entre Iniciar Sesión y Registrarse
  const handleModeChange = (_: any, newMode: "login" | "register") => {
    if (newMode) {
      setMode(newMode);
      setError(""); // Resetear errores al cambiar de modo
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "login") {
        // Enviar credenciales al backend
        const response = await axios.post("https://petrohub-backend.onrender.com/auth/ingresar", {
          usuario: formData.username,
          password: formData.password,
        });

        // Guardar token y redirigir
        login(response.data.access_token);
        console.log(response.data.access_token)
        router.push("/upload");
      } else {
        // Enviar datos de registro al backend
        await axios.post("https://petrohub-backend.onrender.com/auth/registrar", {
          nombreCompleto: formData.fullName,
          usuario: formData.username,
          contrasena: formData.password,
        });

        // Una vez registrado, cambiar a modo login
        setMode("login");
      }
    } catch (err) {
      setError("Error en la autenticación. Verifica tus datos.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-[#195e46]">
          {mode === "login" ? "Iniciar Sesión" : "Registrarse"}
        </h2>

        {/* Selector de modo */}
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          fullWidth
        >
          <ToggleButton value="login">Iniciar Sesión</ToggleButton>
          <ToggleButton value="register">Registrarse</ToggleButton>
        </ToggleButtonGroup>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {mode === "register" && (
            <TextField
              label="Nombre Completo"
              name="fullName"
              fullWidth
              onChange={handleChange}
              required
            />
          )}
          <TextField
            label="Nombre de Usuario"
            name="username"
            fullWidth
            onChange={handleChange}
            required
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            fullWidth
            onChange={handleChange}
            required
          />

          {error && <p className="text-red-500 text-center">{error}</p>}

          <Button type="submit" variant="contained" color="primary" fullWidth
            sx= {{
              backgroundColor: "#1E3A8A",
              "&:hover": {
                backgroundColor: "#11214f"
              }
            }}>
            {mode === "login" ? "Iniciar Sesión" : "Registrarse"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
