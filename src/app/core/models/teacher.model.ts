export interface TeacherModel{
  carnet: string
  nombre: string
  apellidos: string
  profesion: string
  materias: string
  celular: string
  color: string
}

export interface TeacherModelId extends TeacherModel{
  id: string
}