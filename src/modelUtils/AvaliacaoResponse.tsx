import { Avaliacao } from "../model/Avaliacao";

export interface AvaliacaoResponse {
    id: number;
    estrela: number;
    avaliacoes: Avaliacao[] | [];
}
