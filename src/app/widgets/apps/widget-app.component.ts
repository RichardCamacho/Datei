import { Component } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: 'widget-app.component.html'
})
export class WidgetappComponent {
  public config: PerfectScrollbarConfigInterface = {};

  // tslint:disable-next-line: deprecation
  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'tab-preventchange2') {
      $event.preventDefault();
    }
  }
}
