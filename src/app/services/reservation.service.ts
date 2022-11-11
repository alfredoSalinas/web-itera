import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, map } from 'rxjs';
import { ReservationModel, ReservationModelId } from '../core/models/reservation.model';
import { StudentModel } from '../core/models/student.model';
// import { Iask } from '../core/models/iask';
// import { Icuentas, IHistorial, Ipatient } from '../core/models/ipatient';
// import { Ireservation } from '../core/models/ireservation';
// import { ReservationModel, ReservationModelId } from '../store/models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private _reservationRef = this.db.collection('admin').doc('principal').collection('reservas')

  _reservation$ = new BehaviorSubject<ReservationModelId[]>([])
  _reservations: ReservationModelId[] = []

  constructor(
    private db: AngularFirestore
  ) { this.getAllReservations }

  getAllReservations(){
    return this._reservationRef.snapshotChanges().pipe(
      map(datos=>{
        return datos.map(d=>{
          return { id: d.payload.doc.id, ...d.payload.doc.data() } as ReservationModelId
        })
      })
    )
  }

  

  async addReservation( reservation: ReservationModel ){
    return await this._reservationRef.doc().set(reservation)
    //this._reservations.push(reservation)
    //this.reservation$.next(this._reservations)
  }

  async deleteItem(id: string){
    return await this._reservationRef
    .doc(id)
    .delete()
  }

  async editReservation(id: string, data: ReservationModel){
    return this._reservationRef.doc(id).update(data)
  }

  // addStudents(id: string, data: StudentModel[]){
  //   const foundId = this.eventos.find(el=>el.id === id)
  //   if(foundId){
  //     const productos = this.eventos.map(el=>{
  //       if(el.id === foundId.id){
  //         el.productos = data
  //         el.totalProductos = data.reduce((t, t1)=>{
  //           return t + (t1.cantidad * t1.precio)
  //         },0)
  //         const dataProducts = {
  //           productos : el.productos,
  //           totalProductos: el.totalProductos
  //         }
  //         this.gastroRef.doc(foundId.id).update(dataProducts).then(()=>{
  //           console.log('producto')
  //         })
  //       }
  //       return el
  //     })
  //     this.eventos = productos
  //     this.gastroEvento$.next(productos)
  //   }else{
  //     console.log('no existe')
  //   }
  // }

  // addAsk( fecha: number, data: Iask ){
  //   this._reservations = this._reservations.map(r=>{
  //       return r
  //   })
  //   this.reservation$.next(this._reservations)
  // }

  // setReservaData(r: Ireservation){
  //   this._reserva$.next(r)
  // }

  // getReservaData(){
  //   return this._reserva$.asObservable()
  // }

}
