import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ContactLists } from './contact-list';
import { ContactList } from './contact-list-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceContactlistRxjsService {

  constructor(private http: HttpClient) { }

  private contactList: ContactLists[] = ContactList;


  // getContactList(): Observable<ContactLists> {
  // You can also fetch data from Api using HttpClient.
  //   return this.http.get(url..)
  // }
  getContactList(): Observable<ContactLists> {
    return from(this.contactList);
  }

  deleteContactList(id: number): void {
    this.contactList = this.contactList.filter(cl => cl.Id !== id);
  }

  addContactList(cl: ContactLists): void {
    this.contactList?.push(cl);
  }

  updateContactList(index: number, cl: ContactLists): void {
    this.contactList[index] = cl;
  }
}
