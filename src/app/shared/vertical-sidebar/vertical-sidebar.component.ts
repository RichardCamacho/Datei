import { Component, AfterViewInit } from '@angular/core';
import { RouteInfo } from './vertical-sidebar.metadata';
import { VerticalSidebarService } from './vertical-sidebar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CoordinadorInfo } from './vertical-sidebar-coordinador.metadata';
import { DocenteInfo } from './vertical-sidebar-docente.metadata';
import { AdminInfo } from './vertical-sidebar-administrador.metadata';
declare var $: any;

@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.component.html'
})
export class VerticalSidebarComponent {
  showMenu = '';
  showSubMenu = '';
  rol;
  public sidebarnavItems: RouteInfo[] = [];

  path = '';

  constructor(private menuServise: VerticalSidebarService, private router: Router) {

    this.rol = sessionStorage.getItem('rol');
    
    switch(this.rol){
      case 'Coordinador':
        this.menuServise.coordinadoritems.subscribe(menuItems => {
          this.sidebarnavItems = menuItems;
          
          // Active menu 
          this.sidebarnavItems.filter(m => m.submenu.filter(
            (s) => {
              if (s.path === this.router.url) {
                this.path = m.title;
              }
            }
          ));
          this.addExpandClass(this.path);
        })
      break;
      case 'Docente':
        this.menuServise.docenteitems.subscribe(menuItems => {
          this.sidebarnavItems = menuItems;
    
          // Active menu 
          this.sidebarnavItems.filter(m => m.submenu.filter(
            (s) => {
              if (s.path === this.router.url) {
                this.path = m.title;
              }
            }
          ));
          this.addExpandClass(this.path);
        });
      break;
      case 'Administrador':
        this.menuServise.adminitems.subscribe(menuItems => {
          this.sidebarnavItems = menuItems;
    
          // Active menu 
          this.sidebarnavItems.filter(m => m.submenu.filter(
            (s) => {
              if (s.path === this.router.url) {
                this.path = m.title;
              }
            }
          ));
          this.addExpandClass(this.path);
        });
      break;

      default:
      break;
    }
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
