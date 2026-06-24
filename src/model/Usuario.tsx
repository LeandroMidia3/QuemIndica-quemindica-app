import { Perfil } from '../components/enum/Perfil';
import { Status } from '../components/enum/Status';

export interface Usuario {
    id: number;
    nome: string;
    emailHash: string;
    dataCadastro: Date;
    perfil: Perfil;
    senha: string;
    status: Status;
}
