import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export interface ProfissionalCard {
    id: number;
    nome: string;
    telefone: string;
    cidade: string;
    estado: string;
    avaliacaoMedia: Float;
    categorias: string;
    uriimagemprincipal: string;
}
