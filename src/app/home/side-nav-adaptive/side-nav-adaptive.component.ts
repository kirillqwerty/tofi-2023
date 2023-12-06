import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { map, Observable } from "rxjs";
import { BreakpointObserver, Breakpoints, BreakpointState } from "@angular/cdk/layout";
import {MatLineModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";

@Component({
  selector: "app-side-nav-adaptive",
  standalone: true,
	imports: [CommonModule, MatListModule, MatSidenavModule, MatIconModule, MatLineModule, MatToolbarModule],
  templateUrl: "./side-nav-adaptive.component.html",
  styleUrl: "./side-nav-adaptive.component.scss",
})
export class SideNavAdaptiveComponent {
  @ViewChild("drawer") drawer: any;
  public selectedItem: string = "";
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result: BreakpointState) => result.matches));

  constructor(private breakpointObserver: BreakpointObserver) {}

  closeSideNav() {
    if (this.drawer._mode == "over") {
      this.drawer.close();
    }
  }
}
