import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentModelId } from 'src/app/core/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { FormStudentComponent } from '../../forms/form-student/form-student.component';

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.scss']
})
export class TableStudentsComponent implements OnInit {

  // _patients$ : Observable<any> = new Observable()
  // _patients!: Subscription

  subscription! : Subscription

  dataSource = new MatTableDataSource

  displayedColumns: string[] = ['carnet', 'nombre', 'apellidos', 'colegio', 'curso', 'celular', 'apoderado', 'celApoderado', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    //private localService: LocalstorageService,
    private studentService: StudentService,
    private dialog: MatDialog,
    private router: Router
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

  editStudent(student: StudentModelId){
    this.studentService.idStudent = student.id
    this.studentService.editForm = true
    this.studentService.formEdit(student)
    this.dialog.open(FormStudentComponent, {
      width: '400px'
    })
  }

}
