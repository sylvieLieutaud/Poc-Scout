import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Visit } from 'src/app/models/visit.model';
import { Constants } from '../config/const';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  baseUrl = Constants.backendURL+ "visit";
  httpOptions = {
    //creation de Header pour connumuquer en differents de méthodes avec nodejs avec URL 
    headers: new HttpHeaders ({
      'Accept': 'application/json, text/plain, */*',
      'Access-Encoding': 'gzip, deflate',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    })
  };

  constructor(private http: HttpClient) { }

  create(data: any): Observable<Visit> {
    return this.http.post<Visit>(this.baseUrl,data,this.httpOptions);
  }

  getAll(): Observable<Visit[]> { 
  return this.http.get<Visit[]>(this.baseUrl,this.httpOptions);
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
  
  findByUser(idUser: any): Observable<Visit[]> {
  return this.http.get<Visit[]>(`${this.baseUrl}/user/${idUser}`);
  }
   
}