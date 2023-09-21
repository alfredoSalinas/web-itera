import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackageModel, PackageModelId } from '../core/models/package.model';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  packageRef = this.db.collection('admin').doc('principal').collection('paquetes')

  formPackage!: FormGroup
  editForm: boolean = false
  idPackage: string = ''

  constructor(
    private db: AngularFirestore,
    private formBuilder: FormBuilder
  ) { 
    this.formInit()
  }

  formInit(){
    this.formPackage = this.formBuilder.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      precio: [0, [Validators.required]],
      clases: [0, [Validators.required]]
    })
  }

  formEdit(data: PackageModelId){
    this.formPackage.patchValue(data)
  }

  getAll(){
    return this.packageRef.snapshotChanges()
  }

  async addItem(data: PackageModel){
    return this.packageRef.doc().set(data)
  }

  async updateItem(id: string, data: PackageModel){
    return await this.packageRef.doc(id).update(data)
  }

  async deleteItem(id: string){
    return await this.packageRef.doc(id).delete()
  }

}
