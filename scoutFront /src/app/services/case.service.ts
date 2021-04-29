import { Injectable } from '@angular/core';
import { from, of } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Case } from '../models/case.model';
import { Constants } from '../config/const';
 
const baseUrl = Constants.backendURL+'case';
 
@Injectable({
 providedIn: 'root'
})
export class CaseService {
 
 constructor(private http: HttpClient) { }
getAll(): Observable<Case[]> {
  return this.http.get<Case[]>(baseUrl);
}

// getAll(): Observable<any> {
//   var listCase=[];
//   this.http.get<Case[]>(baseUrl).subscribe(data=>{
//     console.log(data);
//     data.forEach(element=>{
//       var exCase ={
//         "id": element.id,
//         "caseName": element.caseName,
//         "caseNumber":element.caseNumber
//       };
//       listCase.push(exCase);
//     })
//     console.log(listCase);
//   });
//   return of(listCase);
// }

getAllFiltre(caseName): Observable<Case[]> {
// passer le donnée en params qui sera recupere en "req.query.caseName" dans le nodeJs (controller)
return this.http.get<Case[]>(`${baseUrl}/filtre`,{params: {caseName : `${caseName}`}});
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
 
 findByTitle(title: any): Observable<Case[]> {
 return this.http.get<Case[]>(`${baseUrl}?title=${title}`);
 }


  findByUser(userId: any): Observable<Case[]> {
    return this.http.get<Case[]>(`${baseUrl}/user/${userId}`);
    }

    // findByUser(idUser): Observable<Case[]> {
    //   // passer le donnée en params qui sera recupere en "req.query.caseName" dans le nodeJs (controller)
    //   return this.http.get<Case[]>(`${baseUrl}?user=${idUser}`);
    //   }

}