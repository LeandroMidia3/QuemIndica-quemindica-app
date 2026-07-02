import Config from "react-native-config";

// export const BASE_URL = Config.BASE_URL;
const BASE_URL = "http://localhost:3000"; // ou IP da máquina

export async function getPasswords() {
  const response = await fetch(`${BASE_URL}/selecoes`);
  return response.json();
}

export async function deletePassword(id: string) {
  const response = await fetch(`${BASE_URL}/selecoes/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function name() {
  await fetch('https://suaapi.com/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: 'leandro', password: '1234' })
  });
}
