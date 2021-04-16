import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { InvoiceList } from '../invoice';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {

  id: any;
  invoiceDetail: InvoiceList;

  constructor(activatedRouter: ActivatedRoute, private invoiceService: InvoiceService) {

    this.id = activatedRouter.snapshot.paramMap.get('id');
    this.invoiceDetail = this.invoiceService.getInvoiceList().filter(x => x.id === +this.id)[0];

  }

  ngOnInit() {

  }


}
