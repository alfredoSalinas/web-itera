import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { MainComponent } from './main/main.component';
import { TableStudentComponent } from './components/tables/table-student/table-student.component';
import { SharedModule } from '../shared/shared.module';
import { TableInscribeComponent } from './components/tables/table-inscribe/table-inscribe.component';
import { FormInscriptionComponent } from './components/forms/form-inscription/form-inscription.component';
import { TableWeekAComponent } from './components/tables/table-week-a/table-week-a.component';
import { TableWeekBComponent } from './components/tables/table-week-b/table-week-b.component';
import { ReservationAComponent } from './pages/reservation-a/reservation-a.component';
import { ModalReservationComponent } from './components/modals/modal-reservation/modal-reservation.component';
import { ModalAddStudentsComponent } from './components/modals/modal-add-students/modal-add-students.component';


@NgModule({
  declarations: [
    InscriptionComponent,
    MainComponent,
    TableStudentComponent,
    TableInscribeComponent,
    FormInscriptionComponent,
    TableWeekAComponent,
    TableWeekBComponent,
    ReservationAComponent,
    ModalReservationComponent,
    ModalAddStudentsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
