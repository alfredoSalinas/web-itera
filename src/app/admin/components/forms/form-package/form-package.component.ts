import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PackageModel } from 'src/app/core/models/package.model';
import { PackagesService } from 'src/app/services/packages.service';

@Component({
  selector: 'app-form-package',
  templateUrl: './form-package.component.html',
  styleUrls: ['./form-package.component.scss']
})
export class FormPackageComponent implements OnInit {

  formPackage: FormGroup
  editForm: boolean

  constructor(
    private packageService: PackagesService,
    private snack: MatSnackBar
  ) { 
    this.formPackage = packageService.formPackage
    this.editForm = packageService.editForm
  }

  ngOnInit(): void {
  }

  createItem(){
    if(this.packageService.editForm){
      this.packageService.updateItem(this.packageService.idPackage, this.formPackage.value)
      .then(()=>{
        console.log('Materia actualizada');
      })
    }else{
      this.packageService.addItem(this.formPackage.value).then(()=>{
        console.log('Paquete creado');
      }).catch(e=>{
        console.log(e)
        this.snack.open('Hubo un error al guardar, intente otra vez', 'Aceptar')
      })
    }
    this.packageService.formInit()
  }


}
