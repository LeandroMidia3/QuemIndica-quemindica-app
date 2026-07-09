import { Linking } from 'react-native';

export const formatarData = (data: Date): string => {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(data);
  } catch (error) {
    console.log("Erro ao formatar Data", error);
    return "";
  }
};

export const formataTelefone = (telefone: string): string => {
  return telefone.replace(/\D/g, '');
}

export  const openWhatsApp = (telefone: string) => {
  const phoneNumber = formataTelefone(telefone);
  const message = 'Olá, vi seu nome no QuemIndica e fiquei interessado no seu serviço, como podemos proceder?!';
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  Linking.openURL(url).catch(() => {
    console.log('Não foi possível abrir o WhatsApp');
  });
};
