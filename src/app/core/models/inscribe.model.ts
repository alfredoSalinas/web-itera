import { PackageModel } from "./package.model";
import { StudentModel } from "./student.model";

export interface InscribeModel{
  fecha: number
  estudiante: StudentModel
  paquete: PackageModel
  estado: string
}