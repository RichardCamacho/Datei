import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contact } from './contact';


@Component({
    templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {

    constructor(private modalService: NgbModal, private fb: FormBuilder) { }
    closeResult: string | null = '';
    contact: Contact[] = new Array();
    searchText: any;
    contacts: FormGroup = Object.create(null);

    ValidationMessage = {
        name: { required: 'Required name.' },
        post: { required: 'Required post.' },
        address: { required: 'Required address.' },
        contactno: {
            required: 'Required contactno.',
            maxlength: 'Max length is 10 digits.',
            pattern: 'Should be numbers only.'
        },
        insta: {
            required: 'Required field.',
            maxlength: 'Max length is 5 digits.',
            pattern: 'Should be numbers only.'
        },
        linkedin: {
            required: 'Required field.',
            maxlength: 'Max length is 5 digits.',
            pattern: 'Should be numbers only.'
        },
        facebook: {
            required: 'Required field.',
            maxlength: 'Max length is 5 digits.',
            pattern: 'Should be numbers only.'
        }
    };

    formsErrors = {};

    open(content: string) {
        this.modalService.open(content, { size: 'lg', centered: true });
    }

    ngOnInit() {
        this.contacts = this.fb.group({
            name: ['', Validators.required],
            post: ['', Validators.required],
            address: ['', Validators.required],
            contactno: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
            insta: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9]*$')]],
            linkedin: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9]*$')]],
            facebook: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9]*$')]],
        });

        this.contacts.valueChanges.subscribe((d: any) => {
            this.logValidationErrors(this.contacts);
        });

        this.contact = [
            {
                img: 'assets/images/users/2.jpg',
                name: 'Johnathan Doe',
                post: 'Web Designer',
                address: '795 Folsom Ave, Suite 600 San Francisco, CADGE 94107',
                contactno: 1234567890,
                insta: 254,
                linkedin: 54,
                facebook: 154
            },
            {
                img: 'assets/images/users/8.jpg',
                name: 'Oliver Smith',
                post: 'Theme Designer',
                address: '55 E 11th St #1OTH, Suite 600 New York, NY, 10003 ',
                contactno: 2122288403,
                insta: 150,
                linkedin: 14,
                facebook: 165
            },
            {
                img: 'assets/images/users/4.jpg',
                name: 'George Johnson',
                post: 'Front End Developer',
                address: '36 W 138th St, San Francisco New York, NY, 10037',
                contactno: 2122341783,
                insta: 300,
                linkedin: 65,
                facebook: 130
            },
            {
                img: 'assets/images/users/5.jpg',
                name: 'Harry Potter',
                post: 'Hacker',
                address: '2289 5th Ave, Suite 600 San Francisco New York, NY, 10037',
                contactno: 2124568403,
                insta: 220,
                linkedin: 38,
                facebook: 178
            },
            {
                img: 'assets/images/users/6.jpg',
                name: 'Jack Williams',
                post: 'Back End Developer',
                address: '425 5th Ave, San Francisco New York, NY, 10016',
                contactno: 1544568745,
                insta: 650,
                linkedin: 150,
                facebook: 195
            },
            {
                img: 'assets/images/users/7.jpg',
                name: 'Jacob Jones',
                post: 'Graphics Designer',
                address: '17 Stuyvesant Walk, Suite 600 New York, NY, 10009',
                contactno: 1507847890,
                insta: 151,
                linkedin: 29,
                facebook: 160
            }
        ];
    }

    logValidationErrors(group: FormGroup) {
        // Object.keys(group.controls).forEach((key: string) => {
        //     const ac = group.get(key);

        //     this.formsErrors[key] = '';
        //     if (ac && !ac.valid && (ac.touched || ac.dirty)) {
        //         const message = this.ValidationMessage[key];
        //         for (const errorKey in ac.errors) {
        //             if (errorKey) {
        //                 this.formsErrors[key] += message[errorKey] + '    ';
        //             }
        //         }

        //     }
        //     if (ac instanceof FormGroup) {
        //         this.logValidationErrors(ac)
        //     }

        // })
    }

    addContact() {
        const cnt: Contact = new Contact();
        cnt.img = 'assets/images/users/6.jpg';

        if (this.contacts != null) {

            cnt.name = this.contacts?.get('name')?.value;

        }


        cnt.post = this.contacts?.get('post')?.value;
        cnt.address = this.contacts?.get('address')?.value;
        cnt.contactno = this.contacts?.get('contactno')?.value;
        cnt.insta = this.contacts?.get('insta')?.value;
        cnt.linkedin = this.contacts?.get('linkedin')?.value;
        cnt.facebook = this.contacts?.get('facebook')?.value;

        this.contact.push(cnt);
    }
}
