import { ImageSourcePropType } from 'react-native';
import { Profissional } from './Profissional';
import { Usuario } from './Usuario';

export interface Avaliacao {
    id: number;
    estrelas: number;
    comentario: string;
    dataAvaliacao: Date;
    tempo: string;
    usuario: Usuario;
    profissional: Profissional
}
