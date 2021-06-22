import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RouteInfo } from './vertical-sidebar.metadata';
import { ROUTES } from './vertical-menu-items';
import { DocenteInfo } from './vertical-sidebar-docente.metadata';
import { DOCENTEROUTES } from './vertical-menu-docente-items';
import { CoordinadorInfo } from './vertical-sidebar-coordinador.metadata';
import { COORDINADOROUTES } from './vertical-menu-coordinador-items';
import { AdminInfo } from './vertical-sidebar-administrador.metadata';
import { ADMINROUTES } from './vertical-menu-admin-items';
import { LIDERROUTES } from './vertical-menu-lider-so-items';


@Injectable({
    providedIn: 'root'
})
export class VerticalSidebarService {

    public screenWidth: any;
    public collapseSidebar: boolean = false;
    public fullScreen: boolean = false;

    MENUDOCENTE: RouteInfo[] = DOCENTEROUTES 
    MENUCOORDINADOR: RouteInfo[] = COORDINADOROUTES 
    MENUADMIN: RouteInfo[] = ADMINROUTES
    MENULIDER: RouteInfo[] = LIDERROUTES
    MENUITEMS: RouteInfo[] = ROUTES;//modelo viejo

    items = new BehaviorSubject<RouteInfo[]>(this.MENUITEMS);//modelo viejo
    docenteitems = new BehaviorSubject<RouteInfo[]>(this.MENUDOCENTE);
    coordinadoritems = new BehaviorSubject<RouteInfo[]>(this.MENUCOORDINADOR);
    adminitems = new BehaviorSubject<RouteInfo[]>(this.MENUADMIN);
    lideritems = new BehaviorSubject<RouteInfo[]>(this.MENULIDER);

    constructor() {
    }
}
