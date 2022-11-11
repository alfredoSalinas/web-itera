import { MateriaModel } from "./materia.model"
import { StudentModel } from "./student.model"
import { TeacherModel } from "./teacher.model"

export interface ReservationModel {
    fecha: number
    estudiantes: StudentModel[]
    docente: TeacherModel
}

export interface ReservationModelId extends ReservationModel{
    id: string
}