import { Component, OnInit } from '@angular/core';
import { ContactLists } from './contact-list';
import { ServiceContactlistRxjsService } from './service-contactlist-rxjs.service';

@Component({
  selector: 'app-contact-list-rxjs',
  templateUrl: './contact-list-rxjs.component.html',
  styleUrls: ['./contact-list-rxjs.component.css']
})
export class ContactListRxjsComponent implements OnInit {

  contacts: ContactLists[] = [];
  contactFilter: ContactLists[] | null = null;

  selectedContact: ContactLists | null = null;
  selectedContactCopy: ContactLists | null | any = null;

  editable = false;

  page = 1;
  pageSize = 5;
  collectionSize = 0;
  _searchTerm = '';

  // image.......................................
  public imagePath: string | null = null;
  imgURL: string | null = null;
  public message = '';

  constructor(public contactListservice: ServiceContactlistRxjsService) {
    this.contactListservice.getContactList().subscribe((data) => {
      this.contacts.push(data);
    })
  }

  ngOnInit() {
    this.contactFilter = this.contacts;
    this.collectionSize = this.contactFilter.length;
    this.selectedContact = null;
  }

  // search...
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.contactFilter = this.filter(val);
  }

  filter(v: string) {
    return this.contacts.filter(x => x.Name.toLowerCase().indexOf(v.toLowerCase()) !== -1);
  }


  // table row clicked...
  tableRowClicked(contact: ContactLists) {
    this.selectedContact = contact;
    (document.getElementById('rightMenu') as HTMLFormElement).style.width = '300px';
    this.editContact();
  }

  viewClicked(contact: ContactLists) {
    this.selectedContact = contact;
    (document.getElementById('rightMenu') as HTMLFormElement).style.width = '300px';    

}

  // right menu closed...
  closeRightMenu() {
    this.editable = false;
    this.selectedContact = null;
    this.selectedContactCopy = null;
    (document.getElementById('rightMenu') as HTMLFormElement).style.width = '0';
  }


  editContact() {
    this.selectedContactCopy = Object.assign({}, this.selectedContact);
    this.editable = true;
  }


  // cancel clicked on right menu...
  cancelClick() {
    this.selectedContact = null;
    this.selectedContactCopy = null;
    this.closeRightMenu();
  }

  // edit contact-list...
  saveClick(id: number) {
    if (this.contactFilter) {
      const c: ContactLists | undefined = this.contactFilter.find(con => con.Id === id);

      if (c !== undefined && this.selectedContactCopy) {
        c.Imagepath = this.selectedContactCopy.Imagepath;
        c.Name = this.selectedContactCopy.Name;
        c.Tags = this.selectedContactCopy.Tags;
        c.Jobtitle = this.selectedContactCopy.Jobtitle;
        c.Company = this.selectedContactCopy.Company;
        c.Email = this.selectedContactCopy.Email;
        c.Phonenumber = this.selectedContactCopy.Phonenumber;
        c.Address = this.selectedContactCopy.Address;
        c.DOB = this.selectedContactCopy.DOB;
        c.Description = this.selectedContactCopy.Description;

        this.contactListservice.updateContactList(id, c);

        this.closeRightMenu();
      }
    }
  }

  // delete click...
  deleteClick(id: number) {
    if (this.contactFilter) {
      this.contactListservice.deleteContactList(id);
      this.contactFilter = this.contactFilter.filter(user => user.Id !== id);
    }
    this.collectionSize--;
    this.selectedContact = null;
    this.closeRightMenu();

  }

  // add contact...
  addContact() {
    const con: ContactLists = new ContactLists();
    if (this.contactFilter) {
      const n = Math.max.apply(Math,
        this.contactFilter.map(function (o) { return o.Id; })) + 1;
      con.Id = n;
    }
    con.Imagepath = '/assets/images/users/1.jpg';
    con.Name = 'New Contact';
    con.Tags = 'Test';
    con.Jobtitle = 'Web Designer';
    con.Company = 'Wrappixel';
    con.Email = 'newcontact@gmail.com';
    con.Phonenumber = 9405123015;
    con.Address = 'Bhavnagar, India';
    con.DOB = new Date;
    con.Description = 'Add a Description';

    this.contactListservice.addContactList(con);
    this.contactFilter?.splice(0, 0, con);
    this.collectionSize++;
    this.tableRowClicked(con);
    this.editContact();
  }




  preview(files: any) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.selectedContactCopy!.Imagepath = reader.result;
    };

  }

}
