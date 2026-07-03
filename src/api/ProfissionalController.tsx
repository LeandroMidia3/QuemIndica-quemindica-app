import Config from "react-native-config";
import { Usuario } from "../model/Usuario";
import { Profissional } from "../model/Profissional";
import { UsuarioSave } from "../modelUtils/UsuarioSave";

const BASE_URL = "http://localhost:3000"; // ou IP da máquina


export async function SalvarProfissional(profissional: Profissional) {
   const response = await fetch(`${BASE_URL}/Profissional/Cadastrar`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(profissional)
   });
   return response.json();
}

export async function ObterProfissionalByUsuario(id: number) {
  console.log("ObterByUsuario id: " + id);
  const response = await fetch(`${BASE_URL}/Profissional/ObterByUsuario/${id}`, {
    method: "GET",
  });
  return response.json();
}

export async function ObterProfissional(id: number) {
  console.log("ObterProfissional id: " + id);
  const response = await fetch(`${BASE_URL}/Profissional/ObterId/${id}`, {
    method: "GET",
  });
  return response.json();
}

export async function UpdateProfissional(id: number, profissional: any) {
   const response = await fetch(`${BASE_URL}/Profissional/Update/${id}`, {
     method: 'PUT',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(profissional)
   });
   return response.json();
}

export async function UpdateImagem(imagem: FormData) {
  console.log("UpdateImagem: " + JSON.stringify(imagem));
   const response = await fetch(`${BASE_URL}/Profissional/UpdateImagem`, {
     method: 'PUT',
     body: imagem
   });
   return response.json();
}
