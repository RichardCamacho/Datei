import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { InvoiceList } from './invoice';
import { invoceLists } from './invoice-data';


@Injectable()
export class InvoiceService {

    private invoiceList: InvoiceList[] = [];

    private getInvoice() {
        return from(invoceLists);
    }

    constructor() {
        this.getInvoice().subscribe((data) =>
            this.invoiceList.push(data)
        );
    }



    public getInvoiceList() {
        return this.invoiceList;
    }
    public deleteInvoice(id: number) {
        this.invoiceList = this.invoiceList.filter(CId => CId.id !== id);
    }
    public addInvoice(invoice: InvoiceList) {
        this.invoiceList.splice(0, 0, invoice);
    }
    public updateInvoice(id: number, invoice: InvoiceList) {

        let invoiceDetail = this.getInvoiceList().filter(x => x.id === id)[0];
        invoiceDetail = invoice;
    }










    // public getInvoiceOriginalLst() {
    //    this.getInvoice().subscribe((data)=>
    //    this.invoiceLst.push(data)
    //    );
    //    return this.invoiceLst;
    // }


}