import Config from "react-native-config";
import { Usuario } from "../model/Usuario";
import { Profissional } from "../model/Profissional";
import { UsuarioSave } from "../modelUtils/UsuarioSave";
import { BASE_URL } from '@env'; 
import { Avaliacao } from "../model/Avaliacao";



export async function SalvarAvaliacao(avaliacao: Avaliacao) {
   const response = await fetch(`${BASE_URL}/Avaliacao/Cadastrar`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(avaliacao)
   });
   return response.json();
}

export async function ObterAvaliacaoByProfissional(id: number) {
  console.log("ObterCategoria id: " + id);
  const response = await fetch(`${BASE_URL}/Avaliacao/ObterIdProfissional/${id}`, {
    method: "GET",
  });
  return response.json();
}

