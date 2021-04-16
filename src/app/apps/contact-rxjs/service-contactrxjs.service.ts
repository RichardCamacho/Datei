import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Contact } from './contact';
import { contacts } from './contact-data';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceContactrxjsService {

  constructor(private http: HttpClient) { }

  private contacts: Contact[] = contacts;



  // getContacts(): Observable<Contact> {
  // You can also fetch data from Api using HttpClient.
  //   return this.http.get(url..)
  // }
  getContacts(): Observable<Contact> {
    return from(this.contacts)

  }

  deleteContact(contact: Contact): void {
    this.contacts = this.contacts.filter(Contact =>
      Contact.firstName !== contact.firstName && Contact.lastName !== contact.lastName);
  }

  addContact(con: Contact): void {
    this.contacts?.push(con);
  }


}


