import { Component, OnInit } from '@angular/core';
import { Category, mailbox, filter, label } from './categories';
import { MailGlobalVariable } from '../mail.service';
import { MailService } from '../mailService';
import { getUser } from '../user-data';
import { mailboxList } from '../mailbox-data';
import { Mailbox } from '../mailbox';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

    public config: PerfectScrollbarConfigInterface = {};

    mailboxes: Category[] = mailbox;
    filters: Category[] = filter;
    labels: Category[] = label;
    public showSidebar = false;

    constructor(public ms: MailGlobalVariable,
        public mailService: MailService, public router: Router, public modal: NgbModal) {

        if (this.ms.type === null || this.ms.type === '' || this.ms.type === undefined) {
            this.router.navigate(['apps/mail/inbox']);
        }
        this.ms.type = 'inbox';
    }

    ngOnInit(): void {

        this.ms.mailList = this.mailService.getInbox();
        this.ms.collectionSize = this.ms.mailList.length;

        for (const mail of this.mailService.getInbox()) {
            // tslint:disable-next-line: no-non-null-assertion
            this.ms.users!.push!(getUser!(mail.fromId)!);
        }
        this.ms.topLable = 'Inbox';
        this.global();
    }

    global() {

        this.ms.inboxCount = this.mailService.getInbox().
        filter(inbox => inbox.mailbox === 'Inbox' && inbox.seen === false).length;
        this.ms.spamCount = this.mailService.getSpam().length;
        this.ms.draftCount = this.mailService.getDraft().length;
    }

    mailboxesChanged(type: string) {

        if (type === 'Inbox') {
            this.ms.mailList = this.mailService.getInbox();
            this.ms.collectionSize = this.mailService.getInbox().length;
            this.changeCaterories(type);
            this.ms.type = 'inbox';
            this.router.navigate(['apps/mail/inbox']);
        } else if (type === 'Sent') {
            this.ms.mailList = this.mailService.getSent();
            this.ms.collectionSize = this.mailService.getSent().length;
            this.changeCaterories(type);
            this.ms.type = 'sent';
            this.router.navigate(['apps/mail/sent']);
        } else if (type === 'Draft') {
            this.ms.mailList = this.mailService.getDraft();
            this.ms.collectionSize = this.mailService.getDraft().length;
            this.changeCaterories(type);
            this.ms.type = 'draft';
            this.router.navigate(['apps/mail/draft']);
        } else if (type === 'Spam') {
            this.ms.mailList = this.mailService.getSpam();
            this.ms.collectionSize = this.mailService.getSpam().length;
            this.changeCaterories(type);
            this.ms.type = 'spam';
            this.router.navigate(['apps/mail/spam']);
        } else if (type === 'Trash') {
            this.ms.mailList = this.mailService.getTrash();
            this.ms.collectionSize = this.mailService.getTrash().length;
            this.changeCaterories(type);
            this.ms.type = 'trash';
            this.router.navigate(['apps/mail/trash']);
        }

    }

    changeCaterories(category: string) {

        this.ms.users = [];
        for (const mail of this.ms.mailList) {
            // tslint:disable-next-line: no-non-null-assertion
            this.ms.users.push(getUser(mail.fromId)!);
        }
        this.ms.selectedMail = null;
        this.ms.topLable = category;
    }

    mailSelected(mail: Mailbox) {

        this.ms.selectedMail = null;
        this.ms.selectedMail = mail;
        this.ms.selectedMail.seen = true;
        mail.seen = true;
        this.ms.addClass = true;
        // tslint:disable-next-line: no-non-null-assertion
        this.ms.selectedUser = getUser(mail.fromId)!;

        this.global();

        if (this.ms.type === 'inbox') {
            this.router.navigate(['apps/mail/inbox', mail.MailId]);
        }

        if (this.ms.type === 'sent') {
            this.router.navigate(['apps/mail/sent', mail.MailId]);
        }

        if (this.ms.type === 'draft') {
            this.router.navigate(['apps/mail/draft', mail.MailId]);
        }

        if (this.ms.type === 'spam') {
            this.router.navigate(['apps/mail/spam', mail.MailId]);
        }

        if (this.ms.type === 'trash') {
            this.router.navigate(['apps/mail/trash', mail.MailId]);
        }

        if (this.ms.type === 'star') {
            this.router.navigate(['apps/mail/star', mail.MailId]);
        }

        if (this.ms.type === 'important') {
            this.router.navigate(['apps/mail/important', mail.MailId]);
        }

        if (this.ms.type === 'Personal') {
            this.router.navigate(['apps/mail/personal', mail.MailId]);
        }

        if (this.ms.type === 'Work') {
            this.router.navigate(['apps/mail/work', mail.MailId]);
        }

        if (this.ms.type === 'Payment') {
            this.router.navigate(['apps/mail/payment', mail.MailId]);
        }

        if (this.ms.type === 'Invoice') {
            this.router.navigate(['apps/mail/invoice', mail.MailId]);
        }

        if (this.ms.type === 'Account') {
            this.router.navigate(['apps/mail/account', mail.MailId]);
        }
    }

    filtersClick(type: string) {

        if (type === 'Star') {
            this.filterss(type);
            this.ms.type = 'star';
            this.router.navigate(['apps/mail/star']);
        } else if (type === 'Important') {
            this.filterss(type);
            this.ms.type = 'important';
            this.router.navigate(['apps/mail/important']);
        }
    }

    // tslint:disable-next-line: no-shadowed-variable
    filterss(filter: string) {

        this.ms.mailList = [];
        for (const mail of mailboxList) {
            for (const fil of mail.filter) {
                if (fil === filter) {
                    this.ms.mailList.push(mail);
                }
            }
        }
        this.ms.users = [];
        for (const mail of this.ms.mailList) {
            // tslint:disable-next-line: no-non-null-assertion
            this.ms.users.push(getUser(mail.fromId)!);
        }
        this.ms.collectionSize = this.ms.mailList.length;
        this.ms.topLable = filter;
        this.ms.selectedMail = null;
    }



    labelChange(type: string) {

        if (type === 'Personal') {
            this.labelss(type);
            this.router.navigate(['apps/mail/personal']);
        } else if (type === 'Work') {
            this.labelss(type);
            this.router.navigate(['apps/mail/work']);
        } else if (type === 'Payment') {
            this.labelss(type);
            this.router.navigate(['apps/mail/payments']);
        } else if (type === 'Account') {
            this.labelss(type);
            this.router.navigate(['apps/mail/accounts']);
        } else if (type === 'Invoice') {
            this.labelss(type);
            this.router.navigate(['apps/mail/invoices']);
        } else if (type === 'Forum') {
            this.labelss(type);
            this.router.navigate(['apps/mail/forum']);
        }
    }

    labelss(type: string) {

        this.ms.mailList = [];
        for (const mail of mailboxList) {
            // tslint:disable-next-line: no-shadowed-variable
            for (const label of mail.label) {
                if (label === type) {
                    this.ms.mailList.push(mail);
                }
            }
        }
        this.ms.users = [];
        for (const mail of this.ms.mailList) {
            // tslint:disable-next-line: no-non-null-assertion
            this.ms.users.push(getUser(mail.fromId)!);
        }
        this.ms.collectionSize = this.ms.mailList.length;
        this.ms.selectedMail = null;
        this.ms.topLable = type;
        this.ms.type = type;

    }


    openModal(content: string) {
        this.modal.open(content, { size: 'lg' });
    }

    mobileSidebar() {
        this.showSidebar = !this.showSidebar;
    }

}
