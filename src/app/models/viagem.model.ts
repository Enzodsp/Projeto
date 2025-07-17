export interface Viagem {
  id?: number;
  usuarioId: number;
  destino: string;
  dataIda: string;     // formato YYYY-MM-DD
  dataVolta: string;   // formato YYYY-MM-DD
  descricao: string;
  cepLocal: string;
  pais: string;
  endereco?: {
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
}
