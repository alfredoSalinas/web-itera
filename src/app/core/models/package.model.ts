
export interface PackageModel{
  codigo: string
  nombre: string
  precio: number
  clases: number
}

export interface PackageModelId extends PackageModel{
  id: string
}