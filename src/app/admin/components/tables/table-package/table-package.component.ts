import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PackageModel, PackageModelId } from 'src/app/core/models/package.model';
import { PackagesService } from 'src/app/services/packages.service';
import { FormPackageComponent } from '../../forms/form-package/form-package.component';

@Component({
  selector: 'app-table-package',
  templateUrl: './table-package.component.html',
  styleUrls: ['./table-package.component.scss']
})
export class TablePackageComponent implements OnInit {

  subscription! : Subscription

  dataSource = new MatTableDataSource

  displayedColumns: string[] = ['codigo', 'nombre', 'precio', 'clases', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    //private localService: LocalstorageService,
    private packageService: PackagesService,
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
    this.subscription = this.packageService.getAll().subscribe(data=>{
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

  editItem(packages: PackageModelId){
    this.packageService.idPackage = packages.id
    this.packageService.editForm = true
    this.packageService.formEdit(packages)
    this.dialog.open(FormPackageComponent, {
      width: '400px'
    })
  }

  deleteItem(packages: PackageModelId){
    this.packageService.deleteItem(packages.id).then(()=>{
      console.log('paquete eliminado')
    }).catch(e=>console.error(e))
  }

}
