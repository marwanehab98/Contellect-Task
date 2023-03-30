import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetContactsService {
  private URL = "http://localhost:3001/contacts/";

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')!).token}` })
  };

  constructor(private http: HttpClient) { }

  getContacts(id: string, offset: number, filters: any = null): Observable<any> {
    var filterString = '';
    if (filters) {
      Object.keys(filters).forEach(filter => {
        if (filters[filter] !== '') filterString += `&${filter}=${filters[filter]}`
      });
    }
    return this.http.get<any>(`${this.URL}get?userId=${id}&offset=${offset}${filterString}`, this.httpOptions)
  }

  updateContact(updatedContact: any) {
    return this.http.post<any>(`${this.URL}edit`,
      updatedContact,
      this.httpOptions)
  }

  addContact(contact: any) {
    return this.http.post<any>(`${this.URL}create`,
      contact,
      this.httpOptions)
  }

  deleteContact(_id: string) {
    return this.http.post<any>(`${this.URL}delete`,
      { _id },
      this.httpOptions)
  }
}