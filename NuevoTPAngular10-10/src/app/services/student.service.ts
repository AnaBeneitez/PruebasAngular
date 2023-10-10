import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentModule } from '../models/student/student.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url = 'https://7498-181-231-122-56.ngrok-free.app/student'

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.url + '/getAll')
  }

  save(s: StudentModule): Observable<any> {
    return this.http.post(this.url, s)
  }

  update(s: StudentModule): Observable<any> {
    return this.http.post(this.url + '/' + s.id + '/update', s)
  }

  delete(id: number): Observable<any> {
    return this.http.post(this.url + '/' + id + '/delete', null)
  }
}
