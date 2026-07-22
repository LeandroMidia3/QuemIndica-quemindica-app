import Config from "react-native-config";
import { Usuario } from "../model/Usuario";
import { UsuarioSave } from "../modelUtils/UsuarioSave";
import { BASE_URL } from '@env'; 
import { Favorito } from "../model/Favorito";
import {EmailForm} from "../modelUtils/EmailForm";

export async function SalvarUsuario(usuario: UsuarioSave) {
   const response = await fetch(`${BASE_URL}/Usuario/CadastrarUsuario`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(usuario)
   });
   return response.json();
}

export async function ObterUsuario(id: number) {
  console.log("ObterUsuario id: " + id);
  const response = await fetch(`${BASE_URL}/Usuario/ObterUsuario/${id}`, {
    method: "GET",
  });
  return response.json();
}

export async function LogarUsuario(usuario: any) {
   const response = await fetch(`${BASE_URL}/Usuario/Login`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(usuario)
   });
   return response.json();
}

export async function UpdateUsuario(id: number, usuario: any) {
   const response = await fetch(`${BASE_URL}/Usuario/Update/${id}`, {
     method: 'PUT',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(usuario)
   });
   return response.json();
}


export async function FavoritarProfissional(favorito: Favorito) {
   const response = await fetch(`${BASE_URL}/Usuario/FavoritarProfissional`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(favorito)
   });
   return response.json();
}

export async function ObterFavorito(favorito: Favorito) {
  console.log("ObterFavorito");
  const response = await fetch(`${BASE_URL}/Usuario/ObterFavorito`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(favorito)
   });
  return response.json();
}

export async function RecuperarSenha(email: EmailForm) {
   const response = await fetch(`${BASE_URL}/Usuario/RecuperarSenha`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(email)
   });
   return response.json();
}
