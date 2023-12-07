import { Component, DestroyRef, Inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BackendService } from "../../../api/backend.service";
import { UserService } from "../../user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MakePaymentRequest } from "../../../models";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { SnackComponent } from "../../../shared/snack/snack.component";
import { customSnackDefaults } from "../../../shared/snack/snack";

@Component({
  selector: "app-credit-pay",
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
    MatSlideToggleModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./credit-pay.component.html",
  styleUrl: "./credit-pay.component.scss",
})
export class CreditPayComponent implements OnInit {
  public payForm = this.fb.group({
    creditName: this.fb.control({ value: "", disabled: true }, Validators.required),
    sumPerMonth: this.fb.control<number | null>({ value: null, disabled: true }, Validators.required),
    penya: this.fb.control<number | null>({ value: null, disabled: true }, Validators.required),
    debtAfterPayment: this.fb.control<number | null>({ value: null, disabled: true }, Validators.required),
    sumToPay: this.fb.control<number | null>({ value: null, disabled: true }, Validators.required),
  });
  constructor(
    private fb: FormBuilder,
    private destroyRef$$: DestroyRef,
    @Inject(MAT_DIALOG_DATA) public data: { creditId: number },
    // public router: Router,
    public back: BackendService,
    public dialogRef: MatDialogRef<CreditPayComponent>,
    public userService: UserService,
    private readonly snackbar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.back.credit
      .getCredit(this.userService.currentUserId, this.data.creditId)
      .pipe(takeUntilDestroyed(this.destroyRef$$))
      .subscribe((res) => {
        this.payForm.patchValue({
          creditName: res.credit_name,
          sumPerMonth: res.sum_per_month,
          penya: res.penya,
          debtAfterPayment: res.debt_after_payment,
          sumToPay: res.sum_to_pay,
        });
      });
  }

  public pay(): void {
    const body: MakePaymentRequest = {
      sum_to_pay: this.payForm.value.sumToPay as number,
    };
    this.back.credit
      .payCredit(this.userService.currentUserId, this.data.creditId, body)
      .pipe(takeUntilDestroyed(this.destroyRef$$))
      .subscribe({
        next: () => {
          this.dialogRef.close("ok");
        },
      });
  }
}
