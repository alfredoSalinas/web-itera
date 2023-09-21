import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { InscribeModel } from 'src/app/core/models/inscribe.model';
import { HistoryModel } from '../../../../core/models/history.model'
import { PackageModel } from 'src/app/core/models/package.model';
import { StudentModel, StudentModelId } from 'src/app/core/models/student.model';
import { HistoryService } from 'src/app/services/history.service';
import { InscriptionService } from 'src/app/services/inscription.service';
import { StudentService } from 'src/app/services/student.service';
import { DiaryModel } from 'src/app/core/models/diary.model';
import { NgxPrintElementService } from 'ngx-print-element';
import ConectorPluginV3 from "../../../../ConectorPluginV3";

import * as moment from 'moment';

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

  impresoras = [];
  impresoraSeleccionada: string = "";
  mensaje: string = "";

  fechaFactura!: number

  public config = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=not,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
  }

  constructor(
    public print: NgxPrintElementService,
    private inscriptionService: InscriptionService,
    private studentService: StudentService,
    private historyService: HistoryService
  ) { 
    this.fechaFactura = Date.now()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.getAll()
    this.getAllPackages()
  }

  getDate(){
    const fecha: number = Number(moment())
    return fecha
  }

  async getPrinters(){
    this.impresoras = await ConectorPluginV3.obtenerImpresoras();
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

  getPackage(){
    const paquete: PackageModel[] = this.paquetes.filter(d=>{
      return d.codigo === this.selected
    })
    return paquete
  }

  addClass(){
    const paquete = this.getPackage()[0]
    console.log(paquete);
    
    const data: StudentModel = {
      carnet: this.student.carnet,
      nombre: this.student.nombre,
      apellidos: this.student.apellidos,
      colegio: this.student.colegio,
      curso: this.student.curso,
      celular: this.student.celular,
      apoderado: this.student.apoderado,
      celApoderado: this.student.celApoderado ? this.student.celApoderado : '',
      clases: this.student.clases ? this.student.clases + paquete.clases : paquete.clases
    }
    console.log('desde ',data);
    
    this.studentService.updateItem(this.student.id, data)
    .then(()=>{
      console.log('estudiante editado');
    })
    .catch(e=>console.log(e))
  }

  registerStudent(){
    // this.addClass()
    // if(this.getPackage()){
    //   const data: InscribeModel = {
    //     fecha: Date.now(),
    //     estudiante: this.student,
    //     paquete: this.getPackage()[0],
    //     estado: 'vigente',
    //   }
  
    //   this.inscriptionService.addInscription(data).then(()=>{
    //     console.log('Exito');
    //     this.addClass()
    //   }).catch(e=>console.log(e))
    // }

    const data: HistoryModel = {
      fecha: Date.now(),
      idStudent: this.student.id,
      detalle: this.getPackage()[0].nombre,
      monto: this.getPackage()[0].precio,
      clases: this.getPackage()[0].clases,
      tipo: 'inscripcion'
    }
    const diary: DiaryModel = {
      fecha: Date.now(),
      codigo: '1.1.1.01',
      detalle: 'Inscripcion',
      parcial: 0,
      debe: 0,
      haber: 150
    }
    this.addClass()
    this.historyService.addItem(data).then(()=>{
      console.log('Inscripcion realizada');
      
    }).catch(e=>console.log(e))

  }

}
