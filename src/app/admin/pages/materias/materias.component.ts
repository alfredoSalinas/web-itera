import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MateriaService } from 'src/app/services/materia.service';
import { FormMateriaComponent } from '../../components/forms/form-materia/form-materia.component';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {

  constructor(
    private materiaService: MateriaService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  showModal(){
    this.materiaService.editForm = false
    this.materiaService.formInit()
    this.materiaService.idMateria = ''
    this.dialog.open(FormMateriaComponent, {
      width: '400px'
    })
  }

}
