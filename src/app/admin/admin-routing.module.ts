import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { MateriasComponent } from './pages/materias/materias.component';
import { PackagesComponent } from './pages/packages/packages.component';
import { StudensComponent } from './pages/studens/studens.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { HistoryComponent } from './pages/history/history.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'estudiantes', component: StudensComponent },
      { path: 'materias', component: MateriasComponent },
      { path: 'paquetes', component: PackagesComponent },
      { path: 'instructores', component: TeachersComponent },
      { path: 'historial', component: HistoryComponent },
      { path: '**', redirectTo: 'estudiantes' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
