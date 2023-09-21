import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DiaryModel } from '../core/models/diary.model';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  diaryRef = this.db.collection('admin').doc('principal').collection('diario')

  constructor(
    private db: AngularFirestore
  ) { }

  async addDiary(diary: DiaryModel){
    return await this.diaryRef.doc().set(diary)
  }

}
