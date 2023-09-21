import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { HistoryModel } from 'src/app/core/models/history.model';
import { MateriaModelId } from 'src/app/core/models/materia.model';
import { StudentModel, StudentModelId } from 'src/app/core/models/student.model';
import { TeacherModelId } from 'src/app/core/models/teacher.model';
import { HistoryService } from 'src/app/services/history.service';
import { InscriptionService } from 'src/app/services/inscription.service';
import { MateriaService } from 'src/app/services/materia.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-form-assistance',
  templateUrl: './form-assistance.component.html',
  styleUrls: ['./form-assistance.component.scss']
})
export class FormAssistanceComponent implements OnInit {

  subscription!: Subscription

  selectedMateria = ''
  selectedTeacher = ''

  student!: StudentModelId

  dataMateria!: any

  materias: MateriaModelId[] = []

  dataDocente!: any
  docentes: TeacherModelId[] = []

  constructor(
    private materiaService: MateriaService,
    private teacherService: TeacherService,
    private inscriptionService: InscriptionService,
    private historyService: HistoryService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.getAll()
    this.getMaterias()
    this.getTeachers()
  }

  getMaterias(){
    this.materiaService.getAll()
    .pipe(
      map(data=>{
        return data.map(d=>{
          return { id: d.payload.doc.id, ...d.payload.doc.data() } as MateriaModelId
        })
      })
    )
    .subscribe(res=>{
      this.materias = res
      this.dataMateria = res.map(m=>{
        return {value: m.nombre, viewValue: m.nombre}
      })
    })
  }

  getTeachers(){
    this.teacherService.getAll()
    .pipe(
      map(data=>{
        return data.map(d=>{
          return {id: d.payload.doc.id, ...d.payload.doc.data() } as TeacherModelId
        })
      })
    ).subscribe(res=>{
      this.docentes = res
      this.dataDocente = res.map(d=>{
        return {value: d.nombre, viewValue: d.nombre}
      })
    })
  }

  getAll(){
    this.subscription = this.inscriptionService.getStudent().subscribe(datos=>{
      if(datos){
        this.student = datos
      }
    })
  }

  // getMateria(){
  //   const paquete: MateriaModelId[] = this.materias.filter(d=>{
  //     return d.nombre === this.selected
  //   })
  //   return paquete
  // }

  discountClass(){
    const data: StudentModel = {
      carnet: this.student.carnet,
      nombre: this.student.nombre,
      apellidos: this.student.apellidos,
      colegio: this.student.colegio,
      curso: this.student.curso,
      celular: this.student.celular,
      apoderado: this.student.apoderado,
      celApoderado: this.student.celApoderado ? this.student.celApoderado : '',
      clases: this.student.clases ? this.student.clases - 1 : 0
    }
    console.log('desde ',data);
    
    this.studentService.updateItem(this.student.id, data)
    .then(()=>{
      console.log('estudiante editado');
    })
    .catch(e=>console.log(e))
  }

  discountClasses(){
    const data: HistoryModel = {
      fecha: Date.now(),
      idStudent: this.student.id,
      detalle: this.selectedMateria,
      monto: 0,
      clases: 1,
      tipo: 'asistencia'
    }
    this.historyService.addItem(data).then(()=>{
      console.log('Asistencia');
      this.discountClass()
    }).catch(e=>console.log(e))
  }  

}
