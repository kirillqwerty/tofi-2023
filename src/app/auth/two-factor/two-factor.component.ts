import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { BackendService } from "../../api/backend.service";
import { ConfirmOtpRequest } from "../../models";
import { TOKEN_KEY } from "../../constants/constants";
import { jwtDecode } from "jwt-decode";
import { ExtendedJwt } from "../../util/extended-jwt";
import { Router } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../../home/user.service";

@Component({
  selector: "app-two-factor",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
  templateUrl: "./two-factor.component.html",
  styleUrl: "./two-factor.component.scss",
})
export class TwoFactorComponent {
  public timerInterval: any;
  public display: any;
  public otp_code = this.fb.control<number | null>(null, [Validators.required]);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    private fb: FormBuilder,
    private back: BackendService,
    public router: Router,
    public dialogRef: MatDialogRef<TwoFactorComponent>,
    public userService: UserService
  ) {
    this.timer(2);
    console.log(this.display);
  }

  start() {
    this.timer(2);
  }
  stop() {
    clearInterval(this.timerInterval);
  }

  public timer(minute: any) {
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec !== 0) statSec--;
      else statSec = 59;
      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;
      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (seconds === 0) {
        console.log("finished");
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  public refreshCode(): void {
    this.back.auth.refreshOpt().subscribe({
      next: (res) => {
        clearInterval(this.timerInterval);
        this.timer(2);
      },
      error: (err) => {
        throw err;
      },
    });
  }

  public confirm(): void {
    const body: ConfirmOtpRequest = {
      otp_code: this.otp_code.value as number,
    };

    this.back.auth.confirmOpt(body).subscribe({
      next: (res) => {
        localStorage.setItem(TOKEN_KEY, res.token || "");
        const decodedToken = jwtDecode(res.token || "") as ExtendedJwt;
        this.userService.currentUserId = decodedToken.user_id;
        this.dialogRef.close();
        this.router.navigateByUrl("/home");
      },
      error: (err) => {
        throw err;
      },
    });
  }
}
