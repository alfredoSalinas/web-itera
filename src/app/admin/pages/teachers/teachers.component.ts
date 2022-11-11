import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeacherService } from 'src/app/services/teacher.service';
import { FormTeacherComponent } from '../../components/forms/form-teacher/form-teacher.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  constructor(
    private teacherService: TeacherService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  showModal(){
    this.teacherService.editForm = false
    this.teacherService.formInit()
    this.teacherService.idTeacher = ''
    this.dialog.open(FormTeacherComponent, {
      width: '400px'
    })
  }

}
