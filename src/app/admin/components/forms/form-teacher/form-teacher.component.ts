import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeacherModel } from 'src/app/core/models/teacher.model';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-form-teacher',
  templateUrl: './form-teacher.component.html',
  styleUrls: ['./form-teacher.component.scss']
})
export class FormTeacherComponent implements OnInit {

  formTeacher: FormGroup
  editForm: boolean

  constructor(
    private teacherService: TeacherService,
    private snack: MatSnackBar
  ) { 
    this.formTeacher = teacherService.formTeacher
    this.editForm = teacherService.editForm
  }

  ngOnInit(): void {
  }

  createStudent(){
    if(this.teacherService.editForm){
      this.teacherService.updateItem(this.teacherService.idTeacher, this.formTeacher.value)
      .then(()=>{
        console.log('Instructor actualizado');
      })
    }else{
      const data: TeacherModel = {
        estado: 'Disponible',
        ...this.formTeacher.value
      }
      this.teacherService.addItem(data).then(()=>{
        console.log('Instructor creado');
      }).catch(e=>{
        console.log(e)
        this.snack.open('Hubo un error al guardar, intente otra vez', 'Aceptar')
      })
    }
    this.teacherService.formInit()
  }

}
