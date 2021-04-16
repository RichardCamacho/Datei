import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';
import { ServiceContactrxjsService } from './service-contactrxjs.service';

@Component({
  selector: 'app-contact-rxjs',
  templateUrl: './contact-rxjs.component.html',
  styleUrls: ['./contact-rxjs.component.scss']
})
export class ContactRxjsComponent implements OnInit {

  public showSidebar = false;

  contacts: Contact[] = [];
  filterArray: Contact[] = [];
  selectedContact: Contact | null |any= null;

  show = true;
  editSave = 'Edit';

  constructor(public contactService: ServiceContactrxjsService) {
    this.contactService.getContacts().subscribe((data) => {
      this.contacts.push(data);
    });    
  }

  ngOnInit() {
    this.filterArray = this.contacts;
    if (this.contacts.length > 0) {
      this.onSelect(this.contacts[0]);
    }
  }

  mobileSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  // search...
  _searchTerm = '';
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

  //on click contact...
  onSelect(contact: Contact) {
    this.selectedContact = contact;
  }


  // edit contact...
  editContact() {
    if (this.editSave === 'Save') {
      this.show = true;
      this.editSave = 'Edit';
    } else {
      this.show = false;
      this.editSave = 'Save';
    }
  }
  // add contact...
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

    this.contactService.addContact(c);
    this.filterArray.splice(0,0,c);
    this.selectedContact = this.filterArray[0];
    this.editContact();


  }


  // delete contact...
  deleteContact(contact: Contact) {
    this.contactService.deleteContact(contact);
    this.filterArray = this.filterArray.filter(con => con.firstName !== contact.firstName && con.lastName !== contact.lastName);
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
