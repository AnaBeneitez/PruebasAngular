import { Component, OnInit } from '@angular/core';
import { StudentModule } from 'src/app/models/student/student.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  studentList = new Array<StudentModule>();

  dni: string
  lastName: string
  firstName: string
  email: string

  id2: number
  dni2: string
  lastName2: string
  firstName2: string
  email2: string

  constructor(private studentService: StudentService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.studentService.getAll().subscribe (response => {
      this.studentList = response;
      this.dni = '';
      this.lastName = '';
      this.firstName = '';
      this.email = '';
      document.getElementsByTagName('input')[0].focus();
    }, error => {
      console.error(error);
      alert('Error: ' + error.error.message);
    })
  }

  save() {
    if(this.dni.trim() !== '' && this.lastName.trim() !== '' && this.firstName.trim() !== '' && this.email.trim() !== ''){
      let s = new StudentModule()
      s.dni = this.dni
      s.lastName = this.lastName
      s.firstName = this.firstName
      s.email = this.email
      s.cohort = 0
      s.status = 'activo'
      s.gender = 'masculino'
      s.adress = 'abc123'
      s.phone = '000'

      this.studentService.save(s).subscribe(() => {
        location.reload()
      }, error => {
        console.error(error)
        alert('Error: ' + error.error.message)
      })
    }
  }
  
  delete(id: number) {
    this.studentService.delete(id).subscribe(() => {
      location.reload()
    }, error => {
      console.error(error)
      alert('Error: ' + error.error.message)
    })
  }

  view(view: any, s: StudentModule) {
    
    
  }
}
