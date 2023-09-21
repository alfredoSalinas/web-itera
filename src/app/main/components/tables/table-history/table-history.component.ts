import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { HistoryModelId } from 'src/app/core/models/history.model';
import { StudentModel, StudentModelId } from 'src/app/core/models/student.model';
import { HistoryService } from 'src/app/services/history.service';
import { InscriptionService } from 'src/app/services/inscription.service';

@Component({
  selector: 'app-table-history',
  templateUrl: './table-history.component.html',
  styleUrls: ['./table-history.component.scss']
})
export class TableHistoryComponent implements OnInit {

  subscription! : Subscription

  dataSource = new MatTableDataSource

  displayedColumns: string[] = ['fecha', 'detalle', 'monto', 'clases'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  student!: StudentModelId

  constructor(
    //private localService: LocalstorageService,
    private historyService: HistoryService,
    private inscriptionService: InscriptionService,
    private dialog: MatDialog,
    private router: Router
  ) { 
    
  }

  ngOnInit(): void {
    this.getStudent()
    this.getAll()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getStudent(){
    this.subscription = this.inscriptionService.getStudent().subscribe(datos=>{
      if(datos){
        this.student = datos
      }
    })
  }

  getAll(){
    this.subscription = this.historyService.getAll()
    .pipe(
      map(data=>{
        return data.map(d=>{
          return { id: d.payload.doc.id, ...d.payload.doc.data() } as HistoryModelId
        })
      })
    )
    .subscribe(data=>{
      this.dataSource.data = data.filter(d=>{
        return d.idStudent === this.student.id
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

  // inscribir(student: StudentModelId){
  //   this.inscriptionService.setStudent(student)
  //   this.dialog.open(FormInscriptionComponent, {
  //     width: '400px'
  //   })
  // }

  // goHistory(student: StudentModelId){
  //   this.router.navigate(['inscripciones/historial'])
  // }

  // discountClasses(student: StudentModelId){

  // }

  // editStudent(student: StudentModelId){
  //   this.studentService.idStudent = student.id
  //   this.studentService.editForm = true
  //   this.studentService.formEdit(student)
  //   this.dialog.open(FormStudentComponent, {
  //     width: '400px'
  //   })
  // }


}
