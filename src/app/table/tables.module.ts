import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablesRoutes } from './tables.routing';
import { DatatableComponent } from './data-table/data-table.component';

import { BasictableComponent } from './basic/basic.component';
import { DarktableComponent } from './dark-basic/dark.component';
import { ColortableComponent } from './color-table/color.component';
import { TablesizeComponent } from './sizing/size.component';
import { TableComponent, NgbdSortableHeader } from './ngtable/ngtable.component';
import { TableService } from './ngtable/ngtable.service';



@NgModule({
  imports: [
    RouterModule.forChild(TablesRoutes),
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ],
  declarations: [
    DatatableComponent,
    BasictableComponent,
    DarktableComponent,
    NgbdSortableHeader,
    ColortableComponent,
    TablesizeComponent,
    TableComponent
  ],
  providers: [TableService]
})
export class TablesModule {}
