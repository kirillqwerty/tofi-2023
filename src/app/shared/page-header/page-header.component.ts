import { Component, DestroyRef, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { SideNavService } from "../../home/side-nav/side-nav.service";

@Component({
  selector: "app-page-header",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: "./page-header.component.html",
  styleUrl: "./page-header.component.scss",
})
export class PageHeaderComponent implements OnInit {
  public isExpanded = true;

  constructor(
    private sideNavService: SideNavService,
    private destroyRef$$: DestroyRef
  ) {}

  public ngOnInit(): void {
    this.sideNavService
      .getSideNavState()
      .pipe(takeUntilDestroyed(this.destroyRef$$))
      .subscribe((res) => (this.isExpanded = res));
  }

  public expandSideNav(): void {
    this.sideNavService.expand();
  }
  public toggleExpand(): void {}
}
