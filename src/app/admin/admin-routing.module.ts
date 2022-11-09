import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { StudensComponent } from './pages/studens/studens.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'estudiantes', component: StudensComponent },
      { path: '**', redirectTo: 'estudiantes' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
