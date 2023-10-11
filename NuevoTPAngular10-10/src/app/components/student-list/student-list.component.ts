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

  dni3: string
  lastName3: string
  firstName3: string
  email3: string

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
    
    this.id2 = s.id
    this.dni2 = s.dni
    this.lastName2 = s.lastName
    this.firstName2 = s.firstName
    this.email2 = s.email

    this.dni3 = s.dni
    this.lastName3 = s.lastName
    this.firstName3 = s.firstName
    this.email3 = s.email

    this.modalService.open(view).result.then(() => {
      if(this.dni2.trim() !== '' && this.lastName2.trim() !== '' && this.firstName2.trim() !== '' && this.email2.trim() !== '' && 
      (this.dni2.trim() !== this.dni3.trim() || this.lastName2.trim() !== this.lastName3.trim() || this.firstName2.trim() !== this.firstName3.trim() || this.email2.trim() !== this.email3.trim())) {
        let student = new StudentModule()
        student.id = this.id2
        student.dni = this.dni2
        student.lastName = this.lastName2
        student.firstName = this.firstName2
        student.email = this.email2
        student.cohort = 0
        student.status = 'activo'
        student.gender = 'masculino'
        student.adress = 'abc123'
        student.phone = '000' 

        this.studentService.update(student).subscribe(() => {
          location.reload()
        }, error => {
          console.error(error)
          alert('Error: ' + error.error.message)
        })
      }
    })
  }
}
