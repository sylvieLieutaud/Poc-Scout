import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collect } from '../models/collect.model';
import { Constants } from '../config/const';
 
const baseUrl = Constants.backendURL+'collect';
 
@Injectable({
 providedIn: 'root'
})

export class CollectService {
 
 constructor(private http: HttpClient) { }

getAll(): Observable<Collect[]> {
  return this.http.get<Collect[]>(baseUrl);
}

get(id: any): Observable<any> {
 return this.http.get(`${baseUrl}/${id}`);
}
 
create(data: any): Observable<any> {
 return this.http.post(baseUrl, data);
}
 
 update(id: any, data: any): Observable<any> {
 return this.http.put(`${baseUrl}/${id}`, data);
 }
 
 delete(id: any): Observable<any> {
 return this.http.delete(`${baseUrl}/${id}`);
 }
 
 deleteAll(): Observable<any> {
 return this.http.delete(baseUrl);
 }
 
 findByTitle(title: any): Observable<Collect[]> {
 return this.http.get<Collect[]>(`${baseUrl}?title=${title}`);
 }
}