import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MateriaService } from 'src/app/services/materia.service';

@Component({
  selector: 'app-form-materia',
  templateUrl: './form-materia.component.html',
  styleUrls: ['./form-materia.component.scss']
})
export class FormMateriaComponent implements OnInit {

  formMateria: FormGroup
  editForm: boolean

  constructor(
    private materiaService: MateriaService,
    private snack: MatSnackBar
  ) { 
    this.formMateria = materiaService.formMateria
    this.editForm = materiaService.editForm
  }

  ngOnInit(): void {
  }

  createItem(){
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
