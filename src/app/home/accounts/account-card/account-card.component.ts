import { ChangeDetectorRef, Component, DestroyRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BackendService } from "../../../api/backend.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../../user.service";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatIconModule } from "@angular/material/icon";
import { CreateAccountDto } from "../../../models";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { SnackComponent } from "../../../shared/snack/snack.component";
import { customSnackDefaults } from "../../../shared/snack/snack";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-account-card",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatIconModule,
  ],
  templateUrl: "./account-card.component.html",
  styleUrl: "./account-card.component.scss",
})
export class AccountCardComponent {
  public accountForm = this.fb.group({
    name: this.fb.control("", [Validators.required]),
    currency: this.fb.control("", [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private destroyRef$$: DestroyRef,
    // public router: Router,
    public back: BackendService,
    public dialogRef: MatDialogRef<AccountCardComponent>,
    public userService: UserService,
    private readonly snackbar: MatSnackBar
  ) {}

  public create(): void {
    console.log(this.accountForm.value);
    const body: CreateAccountDto = {
      name: this.accountForm.value.name || "",
      currency: this.accountForm.value.currency || "",
    };
    this.back.account
      .createAccount(this.userService.currentUserId, body)
      .pipe(takeUntilDestroyed(this.destroyRef$$))
      .subscribe({
        next: (res) => {
          this.snackbar.openFromComponent(SnackComponent, {
            ...customSnackDefaults,
            data: { message: "Счет открыт", type: "success" },
          });
          this.dialogRef.close();
        },
      });
  }
}
