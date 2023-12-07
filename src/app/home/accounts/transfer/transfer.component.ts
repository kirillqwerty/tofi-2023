import { Component, DestroyRef, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { BackendService } from "../../../api/backend.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../../user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CreateAccountDto, TransferRequest } from "../../../models";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { SnackComponent } from "../../../shared/snack/snack.component";
import { customSnackDefaults } from "../../../shared/snack/snack";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: "app-transfer",
  standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatProgressSpinnerModule,
	],
  templateUrl: "./transfer.component.html",
  styleUrl: "./transfer.component.scss",
})
export class TransferComponent {
  public transferForm = this.fb.group({
    receiverId: this.fb.control<number | null>(null, [Validators.required]),
    sum: this.fb.control<number | null>(null, [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private destroyRef$$: DestroyRef,
    @Inject(MAT_DIALOG_DATA) public data: { sender_id: number; currency: string },
    // public router: Router,
    public back: BackendService,
    public dialogRef: MatDialogRef<TransferComponent>,
    public userService: UserService,
    private readonly snackbar: MatSnackBar
  ) {}

  public transfer(): void {
    const body: TransferRequest = {
      sender_id: this.data.sender_id,
      receiver_id: this.transferForm.value.receiverId as number,
      sum: this.transferForm.value.sum as number,
      currency: this.data.currency,
    };
    this.back.account
      .transfer(this.userService.currentUserId, body)
      .pipe(takeUntilDestroyed(this.destroyRef$$))
      .subscribe({
        next: (res) => {
          this.snackbar.openFromComponent(SnackComponent, {
            ...customSnackDefaults,
            data: { message: "Перевод прошел успешно", type: "success" },
          });
          this.dialogRef.close();
        },
      });
  }
}
