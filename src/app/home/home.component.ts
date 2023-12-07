import { Component, DestroyRef, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { AccountsComponent } from "./accounts/accounts.component";
import { DepositsComponent } from "./deposits/deposits.component";
import { CreditsComponent } from "./credits/credits.component";
import { SideNavAdaptiveComponent } from "./side-nav-adaptive/side-nav-adaptive.component";
import { PageHeaderComponent } from "../shared/page-header/page-header.component";
import { LoadingService } from "./loading.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    SideNavComponent,
    AccountsComponent,
    DepositsComponent,
    CreditsComponent,
    SideNavAdaptiveComponent,
    PageHeaderComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  public currentPage = 0;
  public isLoading = false;

  constructor(
    private loadingService: LoadingService,
    private destroyRef$$: DestroyRef
  ) {}

  public ngOnInit(): void {
    this.loadingService.isLoading.pipe(takeUntilDestroyed(this.destroyRef$$)).subscribe((res) => {
      this.isLoading = res;
    });
  }

  public setCurrentPage(id: number): void {
    this.currentPage = id;
  }
}
