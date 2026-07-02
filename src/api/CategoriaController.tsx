import Config from "react-native-config";
import { Usuario } from "../model/Usuario";
import { Profissional } from "../model/Profissional";
import { UsuarioSave } from "../modelUtils/UsuarioSave";

const BASE_URL = "http://localhost:3000"; // ou IP da máquina

export async function ObterCategoria(id: number) {
  console.log("ObterCategoria id: " + id);
  const response = await fetch(`${BASE_URL}/Categoria/ObterId/${id}`, {
    method: "GET",
  });
  return response.json();
}

export async function ObterTodos() {
  console.log("ObterTodos categorias");
  const response = await fetch(`${BASE_URL}/Categoria/ObterTodos`, {
    method: "GET",
  });
  return response.json();
}
