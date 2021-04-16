import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Mail, MailService } from '../mail.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mail-detail',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mail-detail.component.html'
})
export class MailDetailComponent implements OnInit {
  public mail: Mail | undefined = undefined;

  @Output() replyMessage = new EventEmitter();

  constructor(
    private service: MailService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // this.route.params
    // .switchMap((params: Params) => this.service.getMail(+params['id']))
    // .subscribe((mail: Mail) => this.mail = mail);
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.service.getMail(id)
          .then(mail => this.mail = mail);
      }
    });
  }


  goToReply(mail: Mail): void {
    this.replyMessage.emit(mail);
  }

  trash(id: number) {
    this.service.getMail(id).then(mail => {
      if (mail !== undefined) {
        mail.trash = true;
        mail.sent = false;
        mail.draft = false;
        mail.starred = false;
      }
    });
    this.router.navigate(['apps/email/mail-list/inbox']);
  }
}
