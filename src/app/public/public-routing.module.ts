import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/containers/home/home.component';
import { PublicComponent } from './public/public.component';

const routes: Routes = [
  {
    path: '', component: PublicComponent, children: [
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      { path: 'home', component: HomeComponent },
    ]
  },
  { path: 'inscripciones', loadChildren: () => import('../main/main.module').then(m => m.MainModule) },
  { path: 'admin', 
    loadChildren: ()=> import('../admin/admin.module').then(m=>m.AdminModule) 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
