import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherModel, TeacherModelId } from '../core/models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  teacherRef = this.db.collection('admin').doc('principal').collection('docentes')

  formTeacher!: FormGroup
  editForm: boolean = false
  idTeacher: string = ''

  constructor(
    private db: AngularFirestore,
    private formBuilder: FormBuilder
  ) { this.formInit() }

  formInit(){
    this.formTeacher = this.formBuilder.group({
      carnet: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      profesion: ['', [Validators.required]],
      materias: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      color: ['', [Validators.required]]
    })
  }

  formEdit(data: TeacherModelId){
    this.formTeacher.patchValue(data)
  }

  getAll(){
    return this.teacherRef.snapshotChanges()
  }

  async addItem(data: TeacherModel){
    return await this.teacherRef.doc().set(data)
  }

  async updateItem(id: string, data: TeacherModel){
    return await this.teacherRef.doc(id).update(data)
  }

  async deleteItem(id: string){
    return await this.teacherRef.doc(id).delete()
  }

}
