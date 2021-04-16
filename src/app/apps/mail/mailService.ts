import { Injectable } from '@angular/core';
import { mailboxList } from './mailbox-data';


@Injectable()
export class MailService {


    public getInbox() {
        return mailboxList.filter(mail => mail.mailbox === 'Inbox');
    }
    public getSent() {
        return mailboxList.filter(mail => mail.mailbox === 'Sent');
    }
    public getDraft() {
        return mailboxList.filter(mail => mail.mailbox === 'Draft');
    }
    public getSpam() {
        return mailboxList.filter(mail => mail.mailbox === 'Spam');
    }
    public getTrash() {
        return mailboxList.filter(mail => mail.mailbox === 'Trash');
    }

}
