import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { InscribeModel } from 'src/app/core/models/inscribe.model';
import { PackageModel } from 'src/app/core/models/package.model';
import { StudentModelId } from 'src/app/core/models/student.model';
import { InscriptionService } from 'src/app/services/inscription.service';

@Component({
  selector: 'app-form-inscription',
  templateUrl: './form-inscription.component.html',
  styleUrls: ['./form-inscription.component.scss']
})
export class FormInscriptionComponent implements OnInit, OnDestroy {

  subscription!: Subscription
  subscriptionP!: Subscription
  student!: StudentModelId

  selected = ''

  formPackage!: FormControl

  dataPackages: any = []

  paquetes: PackageModel[] = []

  constructor(
    private inscriptionService: InscriptionService
  ) { }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.getAll()
    this.getAllPackages()
  }


  getAll(){
    this.subscription = this.inscriptionService.getStudent().subscribe(datos=>{
      if(datos){
        this.student = datos
      }
    })
  }

  getAllPackages(){
    this.subscriptionP = this.inscriptionService.getPackage()
    .pipe(
      map(datos=>{
        return datos.map(d=> d.payload.doc.data() as PackageModel )
      })
    )
    .subscribe(datos=>{
      this.paquetes = datos
      this.dataPackages = datos.map(d=>{
        return {value: d.codigo, viewValue: d.nombre}
      })
    })
  }

  registerStudent(){
    const paquete: PackageModel[] = this.paquetes.filter(d=>{
      return d.codigo === this.selected
    })
    const data: InscribeModel = {
      fecha: Date.now(),
      estudiante: this.student,
      paquete: paquete[0],
      estado: 'vigente'
    }

    this.inscriptionService.addInscription(data).then(()=>{
      console.log('Exito');
    }).catch(e=>console.log(e))
  }

}
