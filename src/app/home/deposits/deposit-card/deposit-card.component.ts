import { Component, DestroyRef, Inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BackendService } from "../../../api/backend.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../../user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Account, CreateDepositDto } from "../../../models";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { SnackComponent } from "../../../shared/snack/snack.component";
import { customSnackDefaults } from "../../../shared/snack/snack";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "app-deposit-card",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: "./deposit-card.component.html",
  styleUrl: "./deposit-card.component.scss",
})
export class DepositCardComponent implements OnInit {

  public depositForm = this.fb.group({
    accountId: this.fb.control<number | null>(null, [Validators.required]),
    term: this.fb.control("", [Validators.required]),
    amount: this.fb.control<number | null>(null, [Validators.required]),
    depositType: this.fb.control("", [Validators.required]),
  });

  public accounts?: Account[];
  constructor(
    private fb: FormBuilder,
    private destroyRef$$: DestroyRef,
    @Inject(MAT_DIALOG_DATA) public data: { accountId: number },
    // public router: Router,
    public back: BackendService,
    public dialogRef: MatDialogRef<DepositCardComponent>,
    public userService: UserService,
    private readonly snackbar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.fetchAccounts();
    console.log(this.data);
    if (this.data?.accountId) {
      this.depositForm.controls.accountId.setValue(this.data.accountId);
    }
  }

  public fetchAccounts(): void {
    this.back.account
      .getUserAccounts(this.userService.currentUserId)
      .pipe(takeUntilDestroyed(this.destroyRef$$))
      .subscribe({
        next: (res) => {
          this.accounts = res;
          console.log(this.accounts);
        },
      });
  }

  public create(): void {
    console.log(this.data);
    console.log(this.depositForm.value);
    const body: CreateDepositDto = {
      account_id: this.depositForm.value.accountId as number,
      term: this.depositForm.value.term as "MONTH_3" | "MONTH_6" | "MONTH_12" | "PERPETUAL",
      amount: this.depositForm.value.amount as number,
      deposit_type: this.depositForm.value.depositType as "REVOCABLE" | "IRREVOCABLE",
    };
    this.back.deposit
      .createDeposit(this.userService.currentUserId, body)
      .pipe(takeUntilDestroyed(this.destroyRef$$))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.snackbar.openFromComponent(SnackComponent, {
            ...customSnackDefaults,
            data: { message: "Депозит создан", type: "success" },
          });
          this.dialogRef.close();
        },
      });
  }
}
