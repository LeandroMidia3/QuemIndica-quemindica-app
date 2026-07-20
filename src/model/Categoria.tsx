import { Status } from "../components/enum/Status";

export interface Categoria {
    id: number;
    nome: string;
    status: Status;
    imagem: string;
}
