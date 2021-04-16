import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ticketListGlobal } from './ticketListGlobal.service';
import { Ticket } from './ticket';


@Component({
    templateUrl: './ticketlist.component.html'
})
export class TicketlistComponent {

    @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);

    displayedColumns: string[] = ['creator', 'title', 'assignee', 'status', 'product', 'date', 'action'];
    searchText = '';

    dataSource = new MatTableDataSource(this.ticketService.getData());

    dataSourcefilter: null | any = this.dataSource;

    totalCount = 0;
    Open = 0;
    Closed = 0;
    pending = 0;



    constructor(public dialog: MatDialog, public ticketService: ticketListGlobal) {
        this.btnCountStatus();
    }

    btnCategoryClick(val: string): void {
        this.dataSourcefilter = this.dataSource;
        if (val !== '') {
            this.dataSourcefilter = this.dataSource;
            this.dataSourcefilter = this.dataSource.data.filter((o: Ticket) => o.status === val);
        } else {
            this.dataSourcefilter = this.dataSource;
        }
    }


    btnCountStatus(): void {
        this.totalCount = this.dataSource.data.length;
        this.Open = this.dataSource.data.filter((o: Ticket) => o.status === 'Open').length;
        this.Closed = this.dataSource.data.filter((o: Ticket) => o.status === 'Closed').length;
        this.pending = this.dataSource.data.filter((o: Ticket) => o.status === 'Pending').length;

    }

    openDialog(action: string, obj: any): void {
        obj.action = action;
        const dialogRef = this.dialog.open(TicketDialogContent, {
            data: obj
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result.event === 'Add') {
                this.addRowData(result.data);
            } else if (result.event === 'Update') {
                this.updateRowData(result.data);
            } else if (result.event === 'Delete') {
                this.deleteRowData(result.data);
            }
        });
    }

    addRowData(row: any): void {
        const d = new Date();
        this.dataSource.data.push({
            id: d.getTime(),
            creator: row.creator,
            title: row.title,
            assignee: row.assignee,
            status: row.status,
            labelbg: row.labelbg,
            product: row.product,
            date: row.date,
        });
        this.btnCategoryClick('');
        this.btnCountStatus();
        this.table.renderRows();
    }
    deleteRowData(row: any): void {
        this.dataSource.data = this.dataSource.data.filter((value, key) =>
            value.id !== row.id
        );
        this.btnCategoryClick('');
        this.btnCountStatus();
    }
    updateRowData(row: any): void {
        const ticketSource = this.dataSource.data.find((up: Ticket) => up.id === row.id);
        if (ticketSource !== undefined) {
            ticketSource.creator = row.creator;
            ticketSource.title = row.title;
            ticketSource.assignee = row.assignee;
            ticketSource.status = row.status;
            ticketSource.labelbg = row.labelbg;
            ticketSource.product = row.product;
            ticketSource.date = row.date;
        }
        this.btnCategoryClick('');
        this.btnCountStatus();
    }


    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}



@Component({
    // tslint:disable-next-line: component-selector
    selector: 'dialog-content',
    templateUrl: 'dialog-content.html',
})
export class TicketDialogContent {
    action: string;
    // tslint:disable-next-line: variable-name
    local_data: any;

    constructor(
        public dialogRef: MatDialogRef<TicketDialogContent>,
        public ticketService: ticketListGlobal,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: Ticket) {

        this.local_data = { ...data };
        this.action = this.local_data.action;
    }

    doAction(): void {
        this.dialogRef.close({ event: this.action, data: this.local_data });
    }

    closeDialog(): void {
        this.dialogRef.close({ event: 'Cancel' });
    }

}
