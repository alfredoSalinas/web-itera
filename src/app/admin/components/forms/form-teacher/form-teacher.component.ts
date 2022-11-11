import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    // if(this.standService.editForm){
    //   this.standService.updateItem(this.standService.idStand, this.formStand.value)
    //   .then(()=>{
    //     console.log('Stand actulaizado');
    //   })
    // }else{
    //   const data: StandModel = {
    //     estado: 'Disponible',
    //     ...this.formStand.value
    //   }
    //   this.standService.addItem(data).then(()=>{
    //     console.log('Stand creado');
    //   }).catch(e=>{
    //     console.log(e)
    //     this.snack.open('Hubo un error al guardar, intente otra vez', 'Aceptar')
    //   })
    // }
  }

}
