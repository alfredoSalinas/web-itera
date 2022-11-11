import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MateriaModelId } from 'src/app/core/models/materia.model';
import { MateriaService } from 'src/app/services/materia.service';
import { FormMateriaComponent } from '../../forms/form-materia/form-materia.component';

@Component({
  selector: 'app-table-materias',
  templateUrl: './table-materias.component.html',
  styleUrls: ['./table-materias.component.scss']
})
export class TableMateriasComponent implements OnInit, OnDestroy {

  subscription! : Subscription

  dataSource = new MatTableDataSource

  displayedColumns: string[] = ['codigo', 'nombre', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    //private localService: LocalstorageService,
    private materiaService: MateriaService,
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
    this.subscription = this.materiaService.getAll().subscribe(data=>{
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

  editTeacher(materia: MateriaModelId){
    this.materiaService.idMateria = materia.id
    this.materiaService.editForm = true
    this.materiaService.formEdit(materia)
    this.dialog.open(FormMateriaComponent, {
      width: '400px'
    })
  }

}
