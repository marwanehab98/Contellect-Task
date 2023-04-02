import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Socket } from 'ngx-socket-io';

// class Contact {
//   name: string | undefined;
//   phone: string | undefined;
//   address: string | undefined;
//   notes: string | undefined;
//   userId: string | undefined;
// }

@Injectable({
  providedIn: 'root'
})
export class GetContactsService {
  private URL = "http://localhost:3001/contacts/";

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')!).token}` })
  };

  editedContact = this.socket.fromEvent<any>('edited');

  constructor(private http: HttpClient, private socket: Socket) { }

  getContacts(offset: number, filters: any = null): Observable<any> {
    var filterString = '';
    if (filters) {
      Object.keys(filters).forEach(filter => {
        if (filters[filter] !== '') filterString += `&${filter}=${filters[filter]}`
      });
    }
    return this.http.get<any>(`${this.URL}get?offset=${offset}${filterString}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>(false)),
      )
  }

  updateContact(updatedContact: any) {
    this.socket.emit('edit', updatedContact);
    return this.http.post<any>(`${this.URL}edit`,
      updatedContact,
      this.httpOptions)
      .pipe(
        catchError(this.handleError<any>(false)),
      )
  }

  addContact(contact: any) {
    return this.http.post<any>(`${this.URL}create`,
      contact,
      this.httpOptions)
      .pipe(
        catchError(this.handleError<any>(false)),
      )
  }

  deleteContact(_id: string) {
    return this.http.post<any>(`${this.URL}delete`,
      { _id },
      this.httpOptions)
      .pipe(
        catchError(this.handleError<any>(false)),
      )
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
