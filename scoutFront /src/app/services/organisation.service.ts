import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../config/const';
 

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  
  baseUrl =Constants.backendURL +'organisation';

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
   }
   getAll(): Observable<any[]> { 
    return this.http.get< any[]>(this.baseUrl);
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
  
}
