import { ImageSourcePropType } from 'react-native';

export interface Favorito {
  id: string;
  nome: string;
  profissao: string;
  bairro: string;
  rating: number;
  foto: ImageSourcePropType;
}
