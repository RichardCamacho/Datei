import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { WidgetRoutes } from './widgets.routing';
import { WidgetappComponent } from './apps/widget-app.component';
import { WidgetdataComponent } from './data/widget-data.component';

@NgModule({
  imports: [RouterModule.forChild(WidgetRoutes), PerfectScrollbarModule, NgbModule],
  declarations: [WidgetappComponent, WidgetdataComponent]
})
export class WidgetsModule { }
