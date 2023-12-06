import { Component, DestroyRef, EventEmitter, HostListener, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDividerModule } from "@angular/material/divider";
import { expand } from "rxjs";
import { SideNavService } from "./side-nav.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TOKEN_KEY } from "../../constants/constants";
import { Router } from "@angular/router";

@Component({
  selector: "app-side-nav",
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule, MatButtonModule, MatTabsModule, MatDividerModule],
  templateUrl: "./side-nav.component.html",
  styleUrl: "./side-nav.component.scss",
})
export class SideNavComponent implements OnInit {
  @Output() public changePage = new EventEmitter();
  public isExpanded = true;
  public menu = [
    {
      text: "Кредиты",
      icon: "money",
    },
    {
      text: "Счета",
      icon: "credit_card",
    },
    {
      text: "Депозиты",
      icon: "attach_money",
    },
  ];
  public activeMenuItem = 0;
  public width = window.innerWidth;
  constructor(
    private sideNavService: SideNavService,
    private destroyRef$$: DestroyRef,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.sideNavService
      .getSideNavState()
      .pipe(takeUntilDestroyed(this.destroyRef$$))
      .subscribe((res) => (this.isExpanded = res));
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.width = event.target.innerWidth;
    if (this.width > 1000) {
      this.sideNavService.expand();
    }
  }

  public closeSideNav(): void {
    this.sideNavService.close();
  }

  public setActiveMenuItem(id: number): void {
    this.changePage.emit(id);
    this.activeMenuItem = id;
    if (this.width <= 1000) {
      setTimeout(() => this.closeSideNav(), 100);
    }
  }

  public logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigateByUrl("auth");
  }
}
