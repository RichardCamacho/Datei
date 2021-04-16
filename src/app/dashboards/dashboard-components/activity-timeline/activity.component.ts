import { Component } from '@angular/core';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-activity-timeline',
  templateUrl: './activity.component.html'
})
export class ActivityComponent {
	public config: PerfectScrollbarConfigInterface = {};
  constructor() {}
}
