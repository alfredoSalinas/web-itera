import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PackagesService } from 'src/app/services/packages.service';
import { FormMateriaComponent } from '../../components/forms/form-materia/form-materia.component';
import { FormPackageComponent } from '../../components/forms/form-package/form-package.component';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  constructor(
    private packageService: PackagesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  showModal(){
    this.packageService.editForm = false
    this.packageService.formInit()
    this.packageService.idPackage = ''
    this.dialog.open(FormPackageComponent, {
      width: '400px'
    })
  }

}
