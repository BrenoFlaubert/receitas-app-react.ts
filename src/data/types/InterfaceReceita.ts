export interface InterfaceReceita {
  id: number;
  nome: string;
  descricao: string;
  modoDePreparo: string;
  ingredientes: string;
  imgUrl?: string;
  autor: string;
  criadoEm: string;
}