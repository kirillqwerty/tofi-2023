import { Component, DestroyRef, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { Credit, Deposit, MakePaymentRequest } from "../../models";
import { BackendService } from "../../api/backend.service";
import { UserService } from "../user.service";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { finalize } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { DepositCardComponent } from "../deposits/deposit-card/deposit-card.component";
import { getDictionaryValue } from "../../util/get-dictionary-value";
import { CreditCardComponent } from "./credit-card/credit-card.component";
import { statuses, terms } from "../deposits/deposits";
import { CreditPayComponent } from "./credit-pay/credit-pay.component";
import { SnackComponent } from "../../shared/snack/snack.component";
import { customSnackDefaults } from "../../shared/snack/snack";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LoadingService } from "../loading.service";
@Component({
  selector: "app-credits",
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./credits.component.html",
  styleUrl: "./credits.component.scss",
})
export class CreditsComponent implements OnInit {
  public credits?: Credit[];
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
    this.fetchCredits();
  }

  public fetchCredits(): void {
    this.loadingService.isLoading = true;
    this.back.credit
      .getUserCredits(this.userService.currentUserId)
      .pipe(
        finalize(() => (this.loadingService.isLoading = false)),
        takeUntilDestroyed(this.destroyRef$$)
      )
      .subscribe({
        next: (res) => {
          this.credits = res;
          console.log(this.credits);
        },
      });
  }

  public addCredit(): void {
    const dialogRef = this.matDialog.open(CreditCardComponent, {
      maxWidth: "400px",
      width: "90%",
      backdropClass: "backdrop-bg",
      autoFocus: false,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef$$))
      .subscribe(() => this.fetchCredits());
  }

  public close(userId?: number, depositId?: number): void {
    if (userId && depositId) {
      this.back.deposit
        .closeDeposit(userId, depositId)
        .pipe(takeUntilDestroyed(this.destroyRef$$))
        .subscribe({
          next: (res) => {
            this.fetchCredits();
          },
        });
    }
  }

  public pay(creditId?: number): void {
    const dialogRef = this.matDialog.open(CreditPayComponent, {
      maxWidth: "400px",
      width: "90%",
      data: {
        creditId,
      },
      backdropClass: "backdrop-bg",
      autoFocus: false,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef$$))
      .subscribe((res) => {
        if (res === "ok") {
          this.fetchCredits();
          this.snackbar.openFromComponent(SnackComponent, {
            ...customSnackDefaults,
            data: { message: "Кредит частично погашен", type: "success" },
          });
        }
      });
    // const body: MakePaymentRequest = {
    //   sum_to_pay:
    // }
    // this.back.credit.payCredit(this.userService.currentUserId, creditId, )
  }

  public getEmail(): string {
    return this.userService.currentUserEmail;
  }

  public isDateExpired(credit: Credit): boolean {
    const nextPayDate = new Date(credit.next_pay_date || "");
    return new Date() > nextPayDate;
  }

  protected readonly getDictionaryValue = getDictionaryValue;
  protected readonly terms = terms;
  protected readonly statuses = statuses;
}
