import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { ReservationAComponent } from './pages/reservation-a/reservation-a.component';

const routes: Routes = [
  { path: '', component: MainComponent, children: [
    { path: 'inscripciones', component: InscriptionComponent},
    { path: 'horario-a', component: ReservationAComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
