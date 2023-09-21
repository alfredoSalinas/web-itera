import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  fecha: number = Number(moment().startOf('day'))
  fecha1: number = Number(moment().add(1, 'days'))

  constructor(
    private historyService: HistoryService
  ) { }

  ngOnInit(): void {
    this.getSalesByDate()
  }

  setFecha(e: any){
    const fe = e.target.value
    const pipe = moment(fe)
    this.fecha = Number(pipe)
  }

  setFecha1(e: any){
    const fe = e.target.value
    const pipe = moment(fe)
    this.fecha1 = Number(pipe)
  }

  getSalesByDate(){
    this.historyService.getAllSalesByDate(this.fecha, this.fecha1)
  }


}
