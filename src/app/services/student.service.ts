import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentModelId } from '../core/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentRef = this.db.collection('admin').doc('principal').collection('estudiantes')

  formStudent!: FormGroup
  editForm: boolean = false
  idStudent: string = ''

  constructor(
    private db: AngularFirestore,
    private formBuilder: FormBuilder
  ) { }

  formInit(){
    this.formStudent = this.formBuilder.group({
      carnet: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      colegio: ['', [Validators.required]],
      curso: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      apoderado: ['', [Validators.required]],
      celularApoderado: ['', Validators.required]
    })
  }

  formEdit(data: StudentModelId){
    this.formStudent.patchValue(data)
  }


  getAll(){
    return this.studentRef.snapshotChanges()
  }

}
