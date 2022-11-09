import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';
import { FormStudentComponent } from '../../components/forms/form-student/form-student.component';

@Component({
  selector: 'app-studens',
  templateUrl: './studens.component.html',
  styleUrls: ['./studens.component.scss']
})
export class StudensComponent implements OnInit {

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  showModal(){
    this.studentService.editForm = false
    this.studentService.formInit()
    this.studentService.idStudent = ''
    this.dialog.open(FormStudentComponent, {
      width: '400px'
    })
  }

}
