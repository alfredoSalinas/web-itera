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
import { PageStudentsComponent } from './pages/page-students/page-students.component';
import { FormStudentComponent } from './components/forms/form-student/form-student.component';
import { PageHistoryComponent } from './pages/page-history/page-history.component';
import { TableHistoryComponent } from './components/tables/table-history/table-history.component';
import { ModalAssistanceComponent } from './components/modals/modal-assistance/modal-assistance.component';
import { FormAssistanceComponent } from './components/forms/form-assistance/form-assistance.component';
import { NgxPrintElementModule } from 'ngx-print-element';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InscriptionComponent,
    MainComponent,
    TableStudentComponent,
    TableInscribeComponent,
    FormInscriptionComponent,
    FormStudentComponent,
    TableWeekAComponent,
    TableWeekBComponent,
    ReservationAComponent,
    ModalReservationComponent,
    ModalAddStudentsComponent,
    PageStudentsComponent,
    PageHistoryComponent,
    TableHistoryComponent,
    ModalAssistanceComponent,
    FormAssistanceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    NgxPrintElementModule,
    SharedModule
  ]
})
export class MainModule { }
