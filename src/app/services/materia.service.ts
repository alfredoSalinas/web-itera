import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriaModel, MateriaModelId } from '../core/models/materia.model';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  materiasRef = this.db.collection('admin').doc('principal').collection('materias')

  formMateria!: FormGroup
  editForm: boolean = false
  idMateria: string = ''

  constructor(
    private db: AngularFirestore,
    private formBuilder: FormBuilder
  ) { this.formInit() }

  formInit(){
    this.formMateria = this.formBuilder.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    })
  }

  formEdit(data: MateriaModelId){
    this.formMateria.patchValue(data)
  }

  getAll(){
    return this.materiasRef.snapshotChanges()
  }

  async addItem(data: MateriaModel){
    return await this.materiasRef.doc().set(data)
  }

  async updateItem(id: string, data: MateriaModel){
    return await this.materiasRef.doc(id).update(data)
  }
}
