import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentModel } from 'src/app/core/models/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.scss']
})
export class FormStudentComponent implements OnInit {

  formStudent: FormGroup
  editForm: boolean

  constructor(
    private studentService: StudentService,
    private snack: MatSnackBar
  ) { 
    this.formStudent = studentService.formStudent
    this.editForm = studentService.editForm
  }

  ngOnInit(): void {
  }

  createStudent(){
    if(this.studentService.editForm){
      this.studentService.updateItem(this.studentService.idStudent, this.formStudent.value)
      .then(()=>{
        console.log('Estudiante actualizado');
      })
    }else{
      const data: StudentModel = {
        clases: 0,
        ...this.formStudent.value
      }
      this.studentService.addItem(data).then(()=>{
        console.log('Estudiante creado');
      }).catch(e=>{
        console.log(e)
        this.snack.open('Hubo un error al guardar, intente otra vez', 'Aceptar')
      })
      this.studentService.formInit()
    }
  }


}
