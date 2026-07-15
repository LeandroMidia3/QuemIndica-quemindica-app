import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export interface ProfissionalPerfil {
    id: number;
    nome: string;
    telefone: string;
    cidade: string;
    estado: string;
    bairro: string;
    avaliacaoMedia: Float;
    categorias: string;
    uriImagemPrincipal: string;
    servico: string;
    servicos: string[];
    descricao: string;
    idusuario?: number;
}
