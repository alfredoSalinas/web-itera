export interface StudentModel {
  carnet: string
  nombre: string
  apellidos: string
  colegio: string
  curso: string
  celular: string
  apoderado: string
  celApoderado: string
  clases: number
}

export interface StudentModelId extends StudentModel {
  id: string
}