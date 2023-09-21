import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StudentModelId } from 'src/app/core/models/student.model';
import { InscriptionService } from 'src/app/services/inscription.service';
import { FormInscriptionComponent } from '../../components/forms/form-inscription/form-inscription.component';

@Component({
  selector: 'app-page-history',
  templateUrl: './page-history.component.html',
  styleUrls: ['./page-history.component.scss']
})
export class PageHistoryComponent implements OnInit {

  student$ = new Observable<StudentModelId| null>()

  constructor(
    private inscriptionService: InscriptionService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.student$ = this.inscriptionService.getStudent()
  }

  inscribir(){
    this.dialog.open(FormInscriptionComponent, {
      width: '400px'
    })
  }

}
