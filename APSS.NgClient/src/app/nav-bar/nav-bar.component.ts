import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { navItems } from '../shared/app-constants';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  private breakpointObserver = inject(BreakpointObserver);
  items = navItems;
  config = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    useDividers: true
    
    
};
 selectedItem(event:any){
  console.log(event);
 }
}
