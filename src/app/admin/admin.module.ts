import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { StudensComponent } from './pages/studens/studens.component';
import { TableStudentsComponent } from './components/tables/table-students/table-students.component';
import { SharedModule } from '../shared/shared.module';
import { FormStudentComponent } from './components/forms/form-student/form-student.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { TableTeachersComponent } from './components/tables/table-teachers/table-teachers.component';
import { MateriasComponent } from './pages/materias/materias.component';
import { FormTeacherComponent } from './components/forms/form-teacher/form-teacher.component';
import { TableMateriasComponent } from './components/tables/table-materias/table-materias.component';
import { FormMateriaComponent } from './components/forms/form-materia/form-materia.component';


@NgModule({
  declarations: [
    AdminComponent,
    StudensComponent,
    TableStudentsComponent,
    FormStudentComponent,
    TeachersComponent,
    TableTeachersComponent,
    MateriasComponent,
    FormTeacherComponent,
    TableMateriasComponent,
    FormMateriaComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
