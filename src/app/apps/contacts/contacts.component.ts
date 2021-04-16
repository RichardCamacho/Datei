import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';
import { ContactService } from './contact.service';



@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

    public showSidebar = false;

    contacts = this.contactService.getContacts();
    selectedContact: Contact | null | any = null;
    show = true;
    editSave = 'Edit';

    filterArray: Contact[] = [];

    _searchTerm = '';

    mobileSidebar() {
        this.showSidebar = !this.showSidebar;
    }

    get searchTerm(): string {
        return this._searchTerm;
    }
    set searchTerm(val: string) {
        this._searchTerm = val;
        this.filterArray = this.filter(val);
    }

    filter(v: string) {
        return this.contacts.filter(x => x.firstName.toLowerCase().
            indexOf(v.toLowerCase()) !== -1 || x.lastName.toLowerCase().indexOf(v.toLowerCase()) !== -1);
    }

    constructor(public contactService: ContactService) {
    }

    ngOnInit() {
        this.filterArray = this.contacts;
        if (this.contacts.length > 0) {
            this.onSelect(this.contacts[0]);
        }
    }


    onSelect(contact: Contact) {
        this.selectedContact = contact;
    }

    editContact() {
        if (this.editSave === 'Save') {
            this.show = true;
            this.editSave = 'Edit';
        } else {
            this.show = false;
            this.editSave = 'Save';
        }
    }

    addContact() {
        let c: Contact = new Contact();
        c.id = Math.max.apply(Math, this.filterArray.map(function (o) { return o.id; })) + 1;
        c.firstName = 'First Name';
        c.lastName = 'Last Name';
        c.mobile = '';
        c.home = '';
        c.company = '';
        c.work = '';
        c.notes = '';
        c.imagePath = 'assets/images/users/1.jpg';

        this.filterArray.splice(0,0,c);
        this.selectedContact = this.filterArray[0];
        this.editContact();
    }

    deleteContact(i: Contact) {
        this.contacts = this.contacts.filter(con => con.firstName !== i.firstName);
        this.filterArray = this.contacts.filter(con => con.firstName !== i.firstName);
        // if(this.filterArray.length>0)
        this.selectedContact = null;
    }

    preview(files: any) {
        debugger;
        if (files.length === 0) {
            return;
        }
        const mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            // this.message = 'Only images are supported.';
            return;
        }
        const reader = new FileReader();
        // this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.selectedContact!.imagePath = reader.result;
        }
    }


}
