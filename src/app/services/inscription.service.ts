import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { InscribeModel } from '../core/models/inscribe.model';
import { PackageModel } from '../core/models/package.model';
import { StudentModelId } from '../core/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  private student$ = new BehaviorSubject<StudentModelId | null>(null)

  constructor(
    private db: AngularFirestore
  ) { }

  setStudent(student: StudentModelId){
    this.student$.next(student)
  }

  getStudent(){
    return this.student$.asObservable()
  }

  getPackage(){
    return this.db.collection('admin').doc('principal').collection('paquetes').snapshotChanges()
  }

  getInscritions(){
    return this.db.collection('admin').doc('principal').collection('inscritos').snapshotChanges()
  }

  async addInscription(data: InscribeModel){
    return await this.db.collection('admin').doc('principal').collection('inscritos')
    .doc().set(data)
  }

}
