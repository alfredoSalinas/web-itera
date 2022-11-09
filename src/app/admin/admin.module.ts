import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { StudensComponent } from './pages/studens/studens.component';
import { TableStudentsComponent } from './components/tables/table-students/table-students.component';
import { SharedModule } from '../shared/shared.module';
import { FormStudentComponent } from './components/forms/form-student/form-student.component';


@NgModule({
  declarations: [
    AdminComponent,
    StudensComponent,
    TableStudentsComponent,
    FormStudentComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
