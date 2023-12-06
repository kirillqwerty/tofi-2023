import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { AccountsComponent } from "./accounts/accounts.component";
import { DepositsComponent } from "./deposits/deposits.component";
import { CreditsComponent } from "./credits/credits.component";
import {SideNavAdaptiveComponent} from "./side-nav-adaptive/side-nav-adaptive.component";
import {PageHeaderComponent} from "../shared/page-header/page-header.component";

@Component({
  selector: "app-home",
  standalone: true,
	imports: [CommonModule, SideNavComponent, AccountsComponent, DepositsComponent, CreditsComponent, SideNavAdaptiveComponent, PageHeaderComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  public currentPage = 0;

  public setCurrentPage(id: number): void {
    this.currentPage = id;
  }
}
