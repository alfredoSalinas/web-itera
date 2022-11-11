import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, Subscription } from 'rxjs';
import { InscribeModel } from 'src/app/core/models/inscribe.model';
import { ReservationModel, ReservationModelId } from 'src/app/core/models/reservation.model';
import { StudentModel } from 'src/app/core/models/student.model';
import { CalendarService } from 'src/app/services/calendar.service';
import { InscriptionService } from 'src/app/services/inscription.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-modal-add-students',
  templateUrl: './modal-add-students.component.html',
  styleUrls: ['./modal-add-students.component.scss']
})
export class ModalAddStudentsComponent implements OnInit {

  _reservation$ = new Observable<ReservationModelId>()

  subscription! : Subscription

  dataSource = new MatTableDataSource

  displayedColumns: string[] = ['nombre', 'apellidos', 'colegio', 'curso', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private calendarService: CalendarService,
    private inscriptionService: InscriptionService,
    private reservationService: ReservationService,
  ) { }

  ngOnInit(): void {
    this._reservation$ = this.calendarService.getPerson()
    this.getAll()
  }

  getAll(){
    this.subscription = this.inscriptionService.getInscritions().subscribe(data=>{
      this.dataSource.data = data.map(d=>{
        return { id: d.payload.doc.id, ...d.payload.doc.data() }
      })
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addStudent(element: any, reserve: ReservationModelId){
    const estudiantes: StudentModel[] = [
      ...reserve.estudiantes,
      element.estudiante
    ]
    const data: ReservationModel = {
      fecha: reserve.fecha,
      docente: reserve.docente,
      estudiantes: estudiantes
    }
    
    this.reservationService.editReservation(reserve.id, data).then(()=>{
      console.log('Bien');
      
    })

  }

}
