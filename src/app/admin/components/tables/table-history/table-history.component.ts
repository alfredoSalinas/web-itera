import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-table-history',
  templateUrl: './table-history.component.html',
  styleUrls: ['./table-history.component.scss']
})
export class TableHistoryComponent implements OnInit {

  subscription! : Subscription

  dataSource = new MatTableDataSource

  /*
    idStudent: string
    fecha: number
    detalle: string
    monto: number
    clases: number
    tipo: string

  */

  displayedColumns: string[] = ['fecha', 'detalle', 'tipo', 'clases', 'monto', 'total'  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    //private localService: LocalstorageService,
    private historyService: HistoryService,
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
    this.subscription = this.historyService.getAllSales().subscribe(data=>{
      this.dataSource.data = data
    })
  }

  getTotalSale(){
    return this.historyService.getTotalHistory()
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


}
