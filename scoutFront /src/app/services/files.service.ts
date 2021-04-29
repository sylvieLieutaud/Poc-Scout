
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Constants } from '../config/const';
 

@Injectable({
 providedIn: 'root'
})
export class FilesService {
 private fileList: string[] = new Array<string>();

 constructor(private http: HttpClient) { }

baseUrl =  Constants.backendURL+ 'files';

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

// save or update one file which will return its path in serve
public upload(file): Observable<any> {
   return this.http.put(this.baseUrl, {fileName: file.fileName, base64data: file.base64data});
}
//get a file fromm serve by fileName
public download(fileName: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/${fileName}`, { responseType: 'json' });
}
//delete a file from serve by fileName
public remove(fileName): void {
  this.http.delete('/files/${fileName}').subscribe(() => {
    this.fileList.splice(this.fileList.findIndex(name => name === fileName), 1);
  });
}

public list(){
  return this.fileList;
}

private addFileToList(fileName: string): void {
  this.fileList.push(fileName);
}
}