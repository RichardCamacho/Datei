import { Component } from '@angular/core';
import { InvoiceList } from '../invoice';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-list-invoices',
  templateUrl: './list-invoices.component.html',
  styleUrls: ['./list-invoices.component.css']
})
export class ListInvoicesComponent {

  compInvoice: InvoiceList[];


  // checkbox
  isMasterSel: boolean;
  checkedCategoryList: any;

  ///////////////////////////


  // pagination
  page = 1;
  pageSize = 5;
  totalLengthOfCollection: number;


  constructor(public invoiceService: InvoiceService) {


    this.compInvoice = this.invoiceService.getInvoiceList();

    // pagination
    this.totalLengthOfCollection = this.invoiceService.getInvoiceList().length;

    // checkbox
    this.isMasterSel = false;
    this.getCheckedItemList();
  }




  deleteInvoice(id: number): void {

    if (confirm('Are you sure to delete this ! ')) {

      this.compInvoice = this.compInvoice.filter(invoice => invoice.id !== id);
      this.totalLengthOfCollection = this.compInvoice.length;
      this.invoiceService.deleteInvoice(id);
    }
  }


  // check-box.

  checkUncheckAll() {
    for (var i = 0; i < this.compInvoice.length; i++) {
      this.compInvoice[i].isSelected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.compInvoice.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedCategoryList = [];
    for (var i = 0; i < this.compInvoice.length; i++) {
      if (this.compInvoice[i].isSelected)
        this.checkedCategoryList.push(this.compInvoice[i]);
    }
    this.checkedCategoryList = JSON.stringify(this.checkedCategoryList);
  }


  /////////////////

  _searchTerm: string = '';
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;

    this.compInvoice = this.filter(val);
    this.totalLengthOfCollection = this.compInvoice.length;
  }

  filter(v: string) {
    return this.invoiceService.getInvoiceList().filter(x => x.billTo.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      x.billFrom.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.status.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.totalCost !== -1);
  }
}
