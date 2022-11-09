import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
