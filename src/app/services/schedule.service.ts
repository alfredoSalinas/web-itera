import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { ReservationModelId } from '../core/models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  horas = [
    '08:30',  
    '10:00',
    '14:30',
    '16:00',
    '17:30',
    '19:00'
  ]

  dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
  indexDia = 0

  bodySemana$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  _selectDate!: moment.Moment

  constructor() { 
    this.iniciarHorario()
  }

  getSchedule(){
    return this.bodySemana$.asObservable()
  }

  iniciarHorario(){
    const semana = moment().startOf('week').add(this.indexDia, 'week').add(1, 'days')
    this._selectDate = semana
    this.tableDays(semana)
  }

  tableDays(dia: moment.Moment){
    const bodySemana = [        
        dia.clone(),
        dia.clone().add(1, 'days'),
        dia.clone().add(2, 'days'),
        dia.clone().add(3, 'days'),
        dia.clone().add(4, 'days'),
        dia.clone().add(5, 'days'),
        dia.clone().add(6, 'days'),
    ]
    this.bodySemana$.next(bodySemana)
  }

  getFecha(fecha: any){
    return moment(fecha).format('MMM DD')
  }

  onAddDia(){
    this.addDia()
    const dia = this._selectDate.clone().add(this.indexDia, 'week')
    this.tableDays(dia)
  }

  onSustDia(){
    this.sustDia()
    const dia = this._selectDate.clone().add(this.indexDia, 'week')
    this.tableDays(dia)
  }

  addDia(){
    this.indexDia = this.indexDia + 1
  }

  sustDia(){
    this.indexDia -= 1
  }

  comparar(hora: any, fecha: any, reservas: ReservationModelId[]){
    const f1 = moment(fecha).format('YYYY-MM-DD')
    const createFecha = moment(`${f1} ${hora}`)
  
    const cf = reservas.filter(el=>{
        const fr = moment(el.fecha).format('YYYY-MM-DD')
        const hr = moment(el.fecha).format('HH:mm')
        return f1===fr && hr==hora
    })

    return this.res(cf, hora)

  }

res(cf: ReservationModelId[], hora: any) {
  const dato: ReservationModelId[]=[]
  if(cf.length>0){ 
      cf.map(reserva=>{
          const hr = moment(reserva.fecha).format('HH:mm')
          if(hr==hora){
              dato.push(reserva)
          }
      })
    }
  return dato
}

}
