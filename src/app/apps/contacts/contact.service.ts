import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { contacts } from './contact-data';


@Injectable()
export class ContactService {

    public contacts: Contact[] = contacts;
    public getContacts() {
        return this.contacts;
    }
}
