import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Constants } from '../config/const';
 
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

baseUrl = Constants.backendURL+ 'user';

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
   }
  getAll(): Observable<User[]> { 
  return this.http.get< User[]>(this.baseUrl);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  
  update(id: any, data: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/${id}`, data);
  }
  
  delete(id: any): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
  deleteAll(): Observable<any> {
  return this.http.delete(this.baseUrl);
  }
  
  findByTitle(title: any): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}?title=${title}`);
  }

  findByEmail(email): Observable<User[]> {
      return this.http.get<User[]>(`${this.baseUrl}/email`,{params: {email : `${email}`}});
      }

}

