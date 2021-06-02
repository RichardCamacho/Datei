import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/_services/login.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-vertical-navigation',
  templateUrl: './vertical-navigation.component.html'
})
export class VerticalNavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;


  public selectedLanguage: any = {
    language: 'Español',
    code: 'es',
    icon: 'es'
  }

  public languages: any[] = [{
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  },
  {
    language: 'Español',
    code: 'es',
    icon: 'es'
  },
  // {
  //   language: 'Français',
  //   code: 'fr',
  //   icon: 'fr'
  // },
  // {
  //   language: 'German',
  //   code: 'de',
  //   icon: 'de'
  // }
]

  nombre; email;

  constructor(private modalService: NgbModal, private translate: TranslateService, private loginService: LoginService,
              private router: Router) {
    translate.setDefaultLang('es');
    this.nombre = sessionStorage.getItem('nombre');
    this.email = sessionStorage.getItem('email');
  }

  changeLanguage(lang: any) {
    this.translate.use(lang.code)
    this.selectedLanguage = lang;
  }

  ngAfterViewInit() { 
    
  }

  userLogOut(){
    this.loginService.logOut();
  }

  onChangePassword() {
    this.router.navigate([`app/configuration/change-password`]);
  }
}
