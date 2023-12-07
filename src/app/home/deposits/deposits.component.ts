import { Component, DestroyRef, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Account, Deposit } from "../../models";
import { BackendService } from "../../api/backend.service";
import { UserService } from "../user.service";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { finalize } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { DepositCardComponent } from "./deposit-card/deposit-card.component";
import { getDictionaryValue } from "../../util/get-dictionary-value";
import { statuses, terms, types } from "./deposits";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LoadingService } from "../loading.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackComponent } from "../../shared/snack/snack.component";
import { customSnackDefaults } from "../../shared/snack/snack";

@Component({
  selector: "app-deposits",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./deposits.component.html",
  styleUrl: "./deposits.component.scss",
})
export class DepositsComponent implements OnInit {
  public deposits?: Deposit[];
  constructor(
    private back: BackendService,
    private userService: UserService,
    private destroyRef$$: DestroyRef,
    public matDialog: MatDialog,
    public router: Router,
    private loadingService: LoadingService
  ) {}

  public ngOnInit(): void {
    this.fetchDeposits();
  }

  public fetchDeposits(): void {
    this.loadingService.isLoading = true;
    this.back.deposit
      .getUserDeposits(this.userService.currentUserId)
      .pipe(
        finalize(() => (this.loadingService.isLoading = false)),
        takeUntilDestroyed(this.destroyRef$$)
      )
      .subscribe({
        next: (res) => {
          this.deposits = res;
        },
      });
  }

  public addDeposit(): void {
    const dialogRef = this.matDialog.open(DepositCardComponent, {
      maxWidth: "400px",
      width: "90%",
      height: "450px",
      backdropClass: "backdrop-bg",
      autoFocus: false,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef$$))
      .subscribe(() => {
        this.fetchDeposits();
      });
  }

  public close(userId?: number, depositId?: number): void {
    if (userId && depositId) {
      this.back.deposit
        .closeDeposit(userId, depositId)
        .pipe(takeUntilDestroyed(this.destroyRef$$))
        .subscribe({
          next: (res) => {
            this.fetchDeposits();
          },
        });
    }
  }

  protected readonly getDictionaryValue = getDictionaryValue;
  protected readonly types = types;
  protected readonly statuses = statuses;
  protected readonly terms = terms;
}
