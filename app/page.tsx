'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { TextField, Button, Pagination } from "@mui/material";

interface Document {
  documentoId: number;
  titulo: string;
  etiquetas: string;
  path: string;
}

const Home = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Función para realizar la búsqueda
  const searchDocuments = async (type: "title" | "tags" | "") => {
    try {
      const query = type === "title" ? `titulo=${title}&tags=` : `titulo=&tags=${tags}`;
      let response;
      if (title == "" && tags == "") {
        response = await axios.get(`http://localhost:8080/?page=${page - 1}&size=9`);  
      } else {
        response = await axios.get(`http://localhost:8080/buscar?${query}&page=${page - 1}&size=9`);
      }
      setDocuments(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error al buscar documentos:", error);
    }
  };

  useEffect(() => {
    searchDocuments("");
  }, [page, title, tags]);

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-3xl font-bold mb-4">Buscar Documentos</h1>

      {/* Campos de búsqueda */}
      <div className="w-full max-w-lg flex flex-col gap-2">
        <TextField
          label="Buscar por Título"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-white rounded-sm md:rounded-lg mb-6"
        />
        <Button variant="contained"
          onClick={() => searchDocuments("title")}
          fullWidth
          sx= {{
            backgroundColor: "#1E3A8A",
            "&:hover": {
              backgroundColor: "#11214f"
            }
          }}>
          Buscar por Título
        </Button>

        <TextField
          label="Buscar por Etiquetas"
          fullWidth
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="bg-white rounded-sm md:rounded-lg mb-6"
        />
        <Button variant="contained" onClick={() => searchDocuments("tags")} fullWidth
          sx= {{
            backgroundColor: "#1E3A8A",
            "&:hover": {
              backgroundColor: "#11214f"
            }
          }}>
          Buscar por Etiquetas
        </Button>
      </div>

      {/* Lista de resultados */}
      <div className="mt-6 w-full max-w-2xl">
        {documents.length > 0 ? (
          <>
            <ul className="bg-gray-800 shadow-md rounded-lg p-4">
              {documents.map((doc) => (
                <li key={doc.documentoId} className="border-b p-2 last:border-none">
                  <p className="font-bold text-white">{doc.titulo}</p>
                  <p className="text-gray-400">Etiquetas: {doc.etiquetas}</p>
                  <a href={`http://localhost:8080/documentos/${doc.titulo}`} className="text-[#16f0a4] hover:underline">
                    Ver Documento
                  </a>
                </li>
              ))}
            </ul>

            {/* Paginación */}
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              className="mt-4"
              sx={{
                color: "primary.main",
                "& .MuiPaginationItem-root": {
                  color: "#3d526e",
                },
                "& .Mui-selected": {
                  color:"#328266",
                },
              }}
            />
          </>
        ) : (
          <p className="mt-4 text-gray-400">No se encontraron documentos.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
