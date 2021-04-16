import { Injectable } from '@angular/core';
import { Table } from './ngtable';
import { tableList } from './ngtable-data';


@Injectable()
export class TableService {

    public tableList: Table[] = tableList;


    public getTable() {
        return this.tableList;
    }
}