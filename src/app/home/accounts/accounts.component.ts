import { Component, DestroyRef, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BackendService } from "../../api/backend.service";
import { Account } from "../../models";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { TwoFactorComponent } from "../../auth/two-factor/two-factor.component";
import { AccountCardComponent } from "./account-card/account-card.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { finalize } from "rxjs";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { TransferComponent } from "./transfer/transfer.component";
import { DepositCardComponent } from "../deposits/deposit-card/deposit-card.component";
import { SnackComponent } from "../../shared/snack/snack.component";
import { customSnackDefaults } from "../../shared/snack/snack";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CreditCardComponent } from "../credits/credit-card/credit-card.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {LoadingService} from "../loading.service";

@Component({
  selector: "app-accounts",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressBarModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./accounts.component.html",
  styleUrl: "./accounts.component.scss",
})
export class AccountsComponent implements OnInit {
  public accounts?: Account[];
  constructor(
    private back: BackendService,
    private userService: UserService,
    private destroyRef$$: DestroyRef,
    public matDialog: MatDialog,
    public router: Router,
    private readonly snackbar: MatSnackBar,
    private loadingService: LoadingService
  ) {}

  public ngOnInit(): void {
    this.fetchAccounts();
  }

  public fetchAccounts(): void {
    this.loadingService.isLoading = true;
    this.back.account
      .getUserAccounts(this.userService.currentUserId)
      .pipe(
        finalize(() => (this.loadingService.isLoading = false)),
        takeUntilDestroyed(this.destroyRef$$)
      )
      .subscribe({
        next: (res) => {
          this.accounts = res;
          console.log(this.accounts);
        },
      });
  }

  public addAccount(): void {
    const dialogRef = this.matDialog.open(AccountCardComponent, {
      maxWidth: "400px",
      width: "90%",
      height: "450px",
      backdropClass: "backdrop-bg",
      autoFocus: false,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef$$))
      .subscribe(() => this.fetchAccounts());
  }

  public transfer(account: Account): void {
    const dialogRef = this.matDialog.open(TransferComponent, {
      maxWidth: "400px",
      width: "90%",
      height: "450px",
      data: {
        sender_id: account.id,
        currency: account.currency,
      },
      backdropClass: "backdrop-bg",
      autoFocus: false,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef$$))
      .subscribe(() => this.fetchAccounts());
  }

  public replenish(accountId?: number): void {
    if (accountId) {
      this.back.account
        .replenishAccount(this.userService.currentUserId, accountId)
        .pipe(
          takeUntilDestroyed(this.destroyRef$$)
        )
        .subscribe({
          next: () => {
            this.fetchAccounts();
            this.snackbar.openFromComponent(SnackComponent, {
              ...customSnackDefaults,
              data: {
                message: "Деньги начислены",
                type: "success",
              },
            });
          },
        });
    }
  }

  public cashOut(accountId?: number): void {
    if (accountId) {
      this.back.account
        .cashOutAccount(this.userService.currentUserId, accountId)
        .pipe(
          takeUntilDestroyed(this.destroyRef$$)
        )
        .subscribe({
          next: () => {
            this.fetchAccounts();
            this.snackbar.openFromComponent(SnackComponent, {
              ...customSnackDefaults,
              data: {
                message: "Деньги сняты",
                type: "success",
              },
            });
          },
        });
    }
  }

  public addDeposit(accountId?: number): void {
    const dialogRef = this.matDialog.open(DepositCardComponent, {
      maxWidth: "400px",
      width: "90%",
      height: "450px",
      data: {
        accountId: accountId,
      },
      backdropClass: "backdrop-bg",
      autoFocus: false,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef$$))
      .subscribe(() => {
        this.fetchAccounts();
      });
  }
  public addCredit(accountId?: number): void {
    const dialogRef = this.matDialog.open(CreditCardComponent, {
      maxWidth: "400px",
      width: "90%",
      height: "addCredit",
      data: {
        accountId: accountId,
      },
      backdropClass: "backdrop-bg",
      autoFocus: false,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef$$))
      .subscribe(() => {
        this.fetchAccounts();
      });
  }
  public block(account: Account): void {
    if (account.id) {
      this.back.account
        .blockAccount(this.userService.currentUserId, account.id, !account.is_blocked as boolean)
        .pipe(
          takeUntilDestroyed(this.destroyRef$$)
        )
        .subscribe({
          next: () => {
            this.fetchAccounts();
            this.snackbar.openFromComponent(SnackComponent, {
              ...customSnackDefaults,
              data: {
                message: `Счет успешно ${account.is_blocked ? "разблокирован" : "заблокирован"}`,
                type: "success",
              },
            });
          },
        });
    }
  }
}
