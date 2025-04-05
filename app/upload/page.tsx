'use client'

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AuthContext } from "@/app/context/AuthContext";
import { TextField, Button } from "@mui/material";

export const Upload = () => {
  const { isAuthenticated, token } = useContext(AuthContext);
  const router = useRouter();

  // Estado del formulario
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  // Manejo del archivo seleccionado
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!tags || !file) {
      setError("Los campos marcados con \" * \" son obligatorios.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("El archivo excede el tamaño de 50 MB.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("titulo", title);
      formData.append("tags", tags);
      formData.append("archivo", file);

      await axios.post("https://petrohub-backend.onrender.com/subir", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
         },
      });

      // Redirigir a la página de búsqueda
      router.push("/");
    } catch (err) {
      setError("Error, el documento ya se encuentra en la base de datos.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-3xl font-bold mb-4">Subir Documento</h1>

      <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Título"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Etiquetas (separadas por comas)"
            fullWidth
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
          <input placeholder="Archivo" type="file" accept=".pdf" onChange={handleFileChange}  required
            className="text-gray-700 file:bg-blue-800 file:text-white file:rounded file:px-4 file:py-2 file:border-0 file:cursor-pointer cursor-pointer"
          />

          {error && <p className="text-red-600 text-center">{error}</p>}

          <div className="flex justify-between">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => router.push("/")}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained"
              sx= {{
                backgroundColor: "#195e46",
                "&:hover": {
                  backgroundColor: "#083b29"
                }
              }}>
              Subir
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
