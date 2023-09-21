
export interface HistoryModel{
  idStudent: string
  fecha: number
  detalle: string
  monto: number
  clases: number
  tipo: string
}

export interface HistoryModelId extends HistoryModel{
  id: string
}