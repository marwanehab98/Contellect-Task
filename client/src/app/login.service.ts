import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL = "http://localhost:3001/auth/login";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(username: String, password: String): Observable<any> {
    return this.http.post<any>(this.URL,
      JSON.stringify({
        username,
        password,
      }),
      this.httpOptions)
      // .pipe(
      //   catchError(this.handleError<any>(false)),
      // )
  }

  // private handleError<T>(result?: T) {
  //   return (error: any): Observable<T> => {
  //     return of(result as T);
  //   };
  // }
}
