import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoryModel, HistoryModelId } from '../core/models/history.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  historyRef = this.db.collection('admin').doc('principal').collection('historial')

  formHistory!: FormGroup
  editForm: boolean = false
  idMateria: string = ''

  histories: HistoryModel[] = []
  historie$ = new BehaviorSubject<HistoryModel[]>([])

  private _totalHistory$: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  constructor(
    private db: AngularFirestore,
    private formBuilder: FormBuilder
  ) { this.formInit() }

  formInit(){
    this.formHistory = this.formBuilder.group({
      detalle: ['', [Validators.required]],
      clases: [0, [Validators.required]],
    })
  }

  formEdit(data: HistoryModelId){
    this.formHistory.patchValue(data)
  }

  getAll(){
    return this.historyRef.snapshotChanges()
  }

  getAllSalesByDate(fecha: number, fecha1: number){
    this.historyRef.ref
    .where('fecha', '>', fecha)
    .where('fecha', '<', fecha1)
    .get().then(datos=>{
      this.histories = datos.docs.map(data=>data.data() as HistoryModel ) 
      this.historie$.next(this.histories)
      this.getTotalHistory()
    })
  }

  getTotalHistory(){
    const total = this.histories.reduce((a: number, d: HistoryModel )=>{
      return a+(d.monto * d.clases)
    }, 0)
    this._totalHistory$.next(total)
    return this._totalHistory$.asObservable()
  }

  getAllSales(){
    return this.historie$.asObservable()
  }

  async addItem(data: HistoryModel){
    return await this.historyRef.doc().set(data)
  }

  async updateItem(id: string, data: HistoryModel){
    return await this.historyRef.doc(id).update(data)
  }
}
