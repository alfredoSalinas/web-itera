import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MateriaModel } from 'src/app/core/models/materia.model';
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
    if(this.materiaService.editForm){
      this.materiaService.updateItem(this.materiaService.idMateria, this.formMateria.value)
      .then(()=>{
        console.log('Materia actualizada');
      })
    }else{
      const data: MateriaModel = {
        estado: 'Disponible',
        ...this.formMateria.value
      }
      this.materiaService.addItem(data).then(()=>{
        console.log('Materia creado');
      }).catch(e=>{
        console.log(e)
        this.snack.open('Hubo un error al guardar, intente otra vez', 'Aceptar')
      })
    }
    this.materiaService.formInit()
  }

}
