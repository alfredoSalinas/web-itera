import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeacherModelId } from 'src/app/core/models/teacher.model';
import { TeacherService } from 'src/app/services/teacher.service';
import { FormTeacherComponent } from '../../forms/form-teacher/form-teacher.component';
import { ModalDeleteComponent } from 'src/app/shared/components/modals/modal-delete/modal-delete.component';

@Component({
  selector: 'app-table-teachers',
  templateUrl: './table-teachers.component.html',
  styleUrls: ['./table-teachers.component.scss']
})
export class TableTeachersComponent implements OnInit {

  subscription! : Subscription

  dataSource = new MatTableDataSource

  displayedColumns: string[] = ['carnet', 'nombre', 'apellidos', 'profesion', 'materias', 'celular', 'color', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    //private localService: LocalstorageService,
    private teacherService: TeacherService,
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
    this.subscription = this.teacherService.getAll().subscribe(data=>{
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

  editTeacher(teacher: TeacherModelId){
    this.teacherService.idTeacher = teacher.id
    this.teacherService.editForm = true
    this.teacherService.formEdit(teacher)
    this.dialog.open(FormTeacherComponent, {
      width: '400px'
    })
  }

  deleteTeacher(id: string){
    const dialogRef = this.dialog.open(ModalDeleteComponent)
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.teacherService.deleteItem(id).then(()=>{
          console.log('Elimininado')
        })
      }
    });
  }

}
