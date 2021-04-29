import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo.model';
import { Constants } from '../config/const';
 
const baseUrl = Constants.backendURL+'photo';
 
@Injectable({
 providedIn: 'root'
})
export class PhotoService {
 
 constructor(private http: HttpClient) { }

getAll(): Observable<Photo[]> {
  return this.http.get<Photo[]>(baseUrl);
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
 
 findByTitle(title: any): Observable<Photo[]> {
 return this.http.get<Photo[]>(`${baseUrl}?title=${title}`);
 }
}