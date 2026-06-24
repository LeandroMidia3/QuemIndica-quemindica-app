export enum Perfil {
  Cliente = "CLIENTE",
  Profissional = "PROFISSIONAL",
  Admin = "ADMIN",
}

function mostrarPerfil(perfil: Perfil) {
  console.log("perfil atual:", perfil);
}
