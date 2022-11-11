import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { StudentModelId } from 'src/app/core/models/student.model';
import { InscriptionService } from 'src/app/services/inscription.service';
import { StudentService } from 'src/app/services/student.service';
import { FormInscriptionComponent } from '../../forms/form-inscription/form-inscription.component';

@Component({
  selector: 'app-table-student',
  templateUrl: './table-student.component.html',
  styleUrls: ['./table-student.component.scss']
})
export class TableStudentComponent implements OnInit {

  subscription! : Subscription

  dataSource = new MatTableDataSource

  displayedColumns: string[] = ['nombre', 'apellidos', 'colegio', 'curso', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    //private localService: LocalstorageService,
    private studentService: StudentService,
    private inscriptionService: InscriptionService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getAll(){
    this.subscription = this.studentService.getAll().subscribe(data=>{
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

  inscribir(student: StudentModelId){
    this.inscriptionService.setStudent(student)
    this.dialog.open(FormInscriptionComponent, {
      width: '400px'
    })
  }

}
