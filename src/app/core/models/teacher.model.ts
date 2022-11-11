export interface TeacherModel{
  carnet: string
  nombre: string
  profesion: string
  materias: string
  celular: string
}

export interface TeacherModelId extends TeacherModel{
  id: string
}