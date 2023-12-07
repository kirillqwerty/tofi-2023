import { Component, DestroyRef, Inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BackendService } from "../../../api/backend.service";
import { UserService } from "../../user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Account, CreateCreditDto, CreateDepositDto } from "../../../models";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { SnackComponent } from "../../../shared/snack/snack.component";
import { customSnackDefaults } from "../../../shared/snack/snack";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { finalize } from "rxjs";
import { LoadingService } from "../../loading.service";

@Component({
  selector: "app-credit-card",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./credit-card.component.html",
  styleUrl: "./credit-card.component.scss",
})
export class CreditCardComponent implements OnInit {
  public accounts?: Account[];

  public creditForm = this.fb.group({
    name: this.fb.control("", [Validators.required]),
    accountId: this.fb.control<number | null>(null, [Validators.required]),
    term: this.fb.control("", [Validators.required]),
    paymentType: this.fb.control("", [Validators.required]),
    amountGiven: this.fb.control<number | null>(null, [Validators.required]),
    isNotificationEnabled: this.fb.control(true, [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private destroyRef$$: DestroyRef,
    @Inject(MAT_DIALOG_DATA) public data: { accountId: number },
    // public router: Router,
    public back: BackendService,
    public dialogRef: MatDialogRef<CreditCardComponent>,
    public userService: UserService,
    private readonly snackbar: MatSnackBar,
    private loadingService: LoadingService
  ) {}
  public ngOnInit(): void {
    this.fetchAccounts();
    console.log(this.data);
    if (this.data?.accountId) {
      this.creditForm.controls.accountId.setValue(this.data.accountId);
    }
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

  public create(): void {

    console.log(this.data);
    console.log(this.creditForm.value);
    const body: CreateCreditDto = {
      name: this.creditForm.value.name || "",
      account_id: this.creditForm.value.accountId as number,
      term: this.creditForm.value.term as "MONTH_3" | "MONTH_6" | "MONTH_12",
      amount_given: this.creditForm.value.amountGiven as number,
      payment_type: this.creditForm.value.paymentType as "AUTO" | "MANUAL",
      is_notification_enabled: this.creditForm.value.isNotificationEnabled as boolean,
    };
    this.back.credit
      .createCredit(this.userService.currentUserId, body)
      .pipe(takeUntilDestroyed(this.destroyRef$$))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.snackbar.openFromComponent(SnackComponent, {
            ...customSnackDefaults,
            data: { message: "Кредит создан", type: "success" },
          });
          this.dialogRef.close();
        },
      });
  }
}
