import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ReservationModel } from 'src/app/core/models/reservation.model';
import { TeacherModel } from 'src/app/core/models/teacher.model';
import { CalendarService } from 'src/app/services/calendar.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-modal-reservation',
  templateUrl: './modal-reservation.component.html',
  styleUrls: ['./modal-reservation.component.scss']
})
export class ModalReservationComponent implements OnInit {

  _teacherSelect: any[] = []
  _teachers: TeacherModel[] = []
  selected = ''

  reservationDate$ = new Observable<number>()

  constructor(
    private teacherService: TeacherService,
    private calendarService: CalendarService,
    private reservationService: ReservationService,
  ) { }

  ngOnInit(): void {
    this.getAllTeacher()
    this.reservationDate$ = this.calendarService.getDate()
  }

  getAllTeacher(){
    this.teacherService.getAll()
    .pipe(
      map(datos=>{
        return datos.map(d=>d.payload.doc.data() as TeacherModel)
      })
    )
    .subscribe(datos=>{
      this._teachers = datos
      this._teacherSelect = datos.map(d=>{
        return {value: d.carnet, viewValue: d.nombre}
      })
    })
  }

  reservar(reserveDate: number){
    console.log(this.selected);
    const teacher: TeacherModel[] = this._teachers.filter(d=>d.carnet === this.selected)
    const data: ReservationModel = {
      fecha: reserveDate,
      docente: teacher[0],
      estudiantes: []
    }
    console.log(data);
    
    this.reservationService.addReservation(data).then(()=>{
      console.log('reservacion hecha');
    }).catch(e=>console.log(e))
    
  }

}
