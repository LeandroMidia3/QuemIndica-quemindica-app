import Config from "react-native-config";
import { Usuario } from "../model/Usuario";
import { Profissional } from "../model/Profissional";
import { UsuarioSave } from "../modelUtils/UsuarioSave";
import { BASE_URL } from '@env'; 

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

export async function deleteFoto(id?: number | 0) {
  const response = await fetch(`${BASE_URL}/Profissional/RemoverImagem/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function ObterProfissionalCard() {
  console.log("ObterProfissionalCard");
  const response = await fetch(`${BASE_URL}/Profissional/ObterTodosCard`, {
    method: "GET",
  });
  return response.json();
}

export async function ObterPerfil(id: number) {
   const response = await fetch(`${BASE_URL}/Profissional/ObterPerfil/${id}`, {
     method: 'GET',
     headers: { 'Content-Type': 'application/json' }
   });
   return response.json();
}

export async function ObterByFavoritosByUsuario(id: number) {
  console.log("ObterProfissional id: " + id);
  const response = await fetch(`${BASE_URL}/Profissional/ObterByFavoritos/${id}`, {
    method: "GET",
  });
  return response.json();
}