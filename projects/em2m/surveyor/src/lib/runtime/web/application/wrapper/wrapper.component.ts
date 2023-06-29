import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subscription} from 'rxjs';
import {StateService} from '../../../../core/state/state.service';
import {AppConfig} from '../../../../core/config/config.service';
import {MatSidenav} from '@angular/material/sidenav';
import {ContextService} from '../../../../core/extension/context.service';

@Component({
  selector: 'surveyor-application-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class ApplicationWrapperComponent implements OnInit, OnDestroy {

  @ViewChild(MatSidenav, {static: true}) matSidenav: MatSidenav;

  isMobile = true;
  brandColor: string;
  staticMenu = false;
  staticMenuOpened = false;
  opened = false;
  fixedMenu = false;
  private staticMenuSub: Subscription;
  private breakpointSub: Subscription;
  private brandSub: Subscription;

  constructor(private config: AppConfig,
              private stateService: StateService,
              private ctx: ContextService,
              private breakpointObserver: BreakpointObserver) {
    this.staticMenu = !!config.get().staticMenu;
    this.fixedMenu = !!config.get().fixedMenu;
    if (this.fixedMenu) {
      this.opened = true;
    }
  }

  ngOnInit() {
    this.staticMenuSub = this.ctx.onValueChange('staticMenu').subscribe(value => {
      if (value !== undefined && value !== null) {
        this.staticMenu = value;
      }
    });

    this.breakpointSub = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).subscribe(result => {
      // this.isMobile = result.matches;
    });

    this.brandSub = this.stateService.watch('brand:loaded').subscribe(brand => {
      if (brand && brand.settings) {
        this.brandColor = brand.settings.navColor;
        if (brand.settings.staticMenu !== undefined && brand.settings.staticMenu !== null) {
          this.staticMenu = !!brand.settings.staticMenu;
        }
        if (brand.settings.fixedMenu !== undefined && brand.settings.fixedMenu !== null) {
          this.fixedMenu = !!brand.settings.fixedMenu;
          this.opened = this.fixedMenu;
        }
      }
    });
  }

  ngOnDestroy() {
    this.breakpointSub?.unsubscribe();
    this.staticMenuSub?.unsubscribe();
  }

  toggleMenu() {
    if (!this.staticMenu) {
      if (!this.fixedMenu) {
        this.matSidenav.toggle();
      }
    } else {
      this.staticMenuOpened = !this.staticMenuOpened;
    }
  }

  closeSidenav() {
    if (!this.staticMenu && !this.fixedMenu) {
      this.matSidenav.close();
    }
  }
}
