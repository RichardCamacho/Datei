import { Component, OnInit, Input } from '@angular/core';
import { getUser } from '../user-data';
import { MailGlobalVariable } from '../mail.service';
import { MailService } from '../mailService';
import { Router } from '@angular/router';



@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {


    constructor(public ms: MailGlobalVariable,
        public mailService: MailService, public router: Router) {
    }

    ngOnInit() {
    }


    labelClick(type: string) {
        this.labels(type);
    }

    labels(label: string) {
        if (this.ms.selectedMail) {
            if (this.ms.selectedMail.label.indexOf(label) === -1) {
                this.ms.selectedMail.label.push(label);
            } else {
                this.ms.selectedMail.label =
                    this.ms.selectedMail.label.filter(str => str !== label);
            }
        }
    }

    iconsClick(name: string) {
        this.icons(name);
    }

    icons(icon: string) {
        if (this.ms.selectedMail) {
            if (this.ms.selectedMail.filter.indexOf(icon) !== -1) {
                this.ms.selectedMail.filter = this.ms.selectedMail.filter.filter(fil => fil !== icon);
            } else {
                this.ms.selectedMail.filter.push(icon);
            }
        }
    }


    ddlRemoveClick(st: string) {
        debugger;
        if (st === 'Spam' && this.ms.selectedMail) {
            this.ms.selectedMail.mailbox = 'Spam';
            if (this.ms.selectedMail) {
                this.ms.spamList.push(this.ms.selectedMail);
            }
            this.ms.selectedMail = Object.create(null);
            this.resetCount();
        } else if (st === 'Trash' && this.ms.selectedMail) {
            this.ms.selectedMail.mailbox = 'Trash';
            if (this.ms.selectedMail) {
                this.ms.trashList.push(this.ms.selectedMail);
            }
            this.ms.selectedMail = Object.create(null);
            this.resetCount();
        } else if (st === 'Read' && this.ms.selectedMail) {
            if (this.ms.selectedMail.seen) {
                this.ms.selectedMail.seen = false;
                this.global();
            } else if (this.ms.selectedMail?.seen) {
                this.ms.selectedMail.seen = true;
                this.global();
            }
        }

    }

    resetCount() {
        this.ms.inboxList = this.mailService.getInbox();
        this.ms.sentList = this.mailService.getSent();
        this.ms.draftList = this.mailService.getDraft();
        this.ms.spamList = this.mailService.getSpam();
        this.ms.trashList = this.mailService.getTrash();

        this.ms.mailList = this.ms.inboxList;

        this.ms.users = [];
        for (const mail of this.ms.mailList) {

            // tslint:disable-next-line: no-non-null-assertion
            this.ms.users.push(getUser(mail.fromId)!);

        }
        this.ms.collectionSize = this.ms.inboxList.length;
        this.ms.selectedMail =null;
        this.ms.topLable = 'Inbox';

        this.ms.type = 'inbox';
        this.global();
        // this.router.navigate(['mail/inbox']);

    }

    global() {
        this.ms.inboxCount = this.mailService.getInbox().
        filter(inbox => inbox.mailbox === 'Inbox' && inbox.seen === false).length;
        this.ms.spamCount = this.mailService.getSpam().length;
        this.ms.draftCount = this.mailService.getDraft().length;
    }

    reply() {
        this.ms.replyShow = true;
    }

    sendButtonClick() {
        this.ms.replyShow = false;
    }

    removeClass() {
        this.ms.addClass = false;
    }
}


