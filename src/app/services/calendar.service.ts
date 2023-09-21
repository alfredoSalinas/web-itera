import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { ReservationModel, ReservationModelId } from '../core/models/reservation.model';
import { StudentModel } from '../core/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  reservationDate: number = 0
  reservationDate$ = new BehaviorSubject<number>(0)
  person$ = new BehaviorSubject<ReservationModelId>({
    id: '',
    estudiantes : [],
    fecha: 0,
    docente: {
      carnet: '',
      nombre: '',
      apellidos: '',
      celular: '',
      profesion: '',
      materias: '',
      color: '',
    }
  })

  constructor() { }

  setDate(h: any, f: any){
    const f1 = moment(f).format('YYYY-MM-DD')
    const createFecha = moment(`${f1} ${h}`)
    this.reservationDate = Number(moment(createFecha))
    this.reservationDate$.next(this.reservationDate)
  }

  getDate(){
    return this.reservationDate$.asObservable()
  }

  setPerson(person: ReservationModelId){
    this.person$.next(person)
  }

  getPerson(){
    return this.person$.asObservable()
  }

  comparar(hora: any, fecha: any, reservas: ReservationModel[]){
    const f1 = moment(fecha).format('YYYY-MM-DD')
    const createFecha = moment(`${f1} ${hora}`)
  
    const cf = reservas.filter(el=>{
        const fr = moment(el.fecha).format('YYYY-MM-DD')
        const hr = moment(el.fecha).format('HH:mm')
        return f1===fr && hr==hora
    })
    return this.res(cf, hora)
  }

  res(cf: ReservationModel[], hora: any) {
    let dato: StudentModel[]=[]
    if(cf.length>0){ 
        cf.map(reserva=>{
            const hr = moment(reserva.fecha).format('HH:mm')
            if(hr==hora){
                dato = reserva.estudiantes
            }
        })
      }
    return dato
  }

}
