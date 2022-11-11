import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ReservationModelId } from 'src/app/core/models/reservation.model';
import { CalendarService } from 'src/app/services/calendar.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import * as moment from 'moment';
import { ReservationService } from 'src/app/services/reservation.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalReservationComponent } from '../../modals/modal-reservation/modal-reservation.component';
import { ModalAddStudentsComponent } from '../../modals/modal-add-students/modal-add-students.component';

@Component({
  selector: 'app-table-week-a',
  templateUrl: './table-week-a.component.html',
  styleUrls: ['./table-week-a.component.scss']
})
export class TableWeekAComponent implements OnInit {

  hoyDia = moment().format('MMM DD')

  bodySemana: Observable<any[]> = new Observable()
  horas = this.scheduleService.horas
  dias = this.scheduleService.dias
  mes = moment().add(0, 'months').format('MMM')

  reserva!: ReservationModelId[]
  _subscription!: Subscription
  _reservation!: ReservationModelId

  constructor(
    private scheduleService: ScheduleService,
    private calendarService: CalendarService, 
    private reservationService: ReservationService,
    private dialog: MatDialog,
  ){
    
  }

  ngOnInit(): void {
    this.bodySemana = this.scheduleService.getSchedule()
    this.getAll()
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

  getAll(){
    this._subscription = this.reservationService.getAllReservations().subscribe(datos=>{
      this.reserva = datos
    })
  }

  onSustDia(){
    this.scheduleService.onSustDia()
  }
  
  onAddDia(){
    this.scheduleService.onAddDia()
  }

  getFecha(f: any){
    return this.scheduleService.getFecha(f)
  }

  comparar(hora: any, fecha: any){
    return this.scheduleService.comparar(hora, fecha, this.reserva)[0]
  }

  showModalReservation(h: any, f: any){
    this._reservation = this.comparar(h, f)
    console.log(this._reservation);
    
    this.calendarService.setDate(h, f)
    if(this._reservation){
      this.calendarService.setPerson(this._reservation)
      this.dialog.open(ModalAddStudentsComponent, {
        width: '800px'
      })
    }else{
      this.dialog.open(ModalReservationComponent, {
        width: '600px',
      })
    }
  }


}
