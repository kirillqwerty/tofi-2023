import { ChangeDetectorRef, Component, DestroyRef, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { Router } from "@angular/router";
import { BackendService } from "../../api/backend.service";
import { log } from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { finalize, of, switchMap } from "rxjs";
import { Login } from "../../models";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { ExtendedJwt } from "../../util/extended-jwt";
import { MatDialog } from "@angular/material/dialog";
import { TwoFactorComponent } from "../two-factor/two-factor.component";
import { TOKEN_KEY } from "../../constants/constants";
import { UserService } from "../../home/user.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatRippleModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  @Output() public switcher = new EventEmitter();
  @Output() public isLoading = new EventEmitter();

  public loginForm = this.fb.group({
    login: this.fb.control("", [Validators.required, Validators.email]),
    password: this.fb.control("", [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private destroyRef$$: DestroyRef,
    public router: Router,
    public back: BackendService,
    public cdr: ChangeDetectorRef,
    public matDialog: MatDialog,
    public userService: UserService
  ) {}

  public switchToReg(): void {
    this.switcher.emit();
  }

  public signIn(): void {
    this.loginForm.markAsTouched();
    if (this.loginForm.value) {
      this.isLoading.emit(true);
      const body: Login = {
        login: this.loginForm.value.login || "",
        password: this.loginForm.value.password || "",
      };
      this.back.auth
        .login(body)
        .pipe(
          finalize(() => {
            this.isLoading.emit(false);
            // this.cdr.detectChanges();
          }),
          switchMap((res) => {
            localStorage.setItem(TOKEN_KEY, res.token || "");
            const decodedToken = jwtDecode(res.token || "") as ExtendedJwt;
            console.log(decodedToken);
            this.userService.currentUserId = decodedToken.user_id;
            return of(decodedToken.two_factor);
          }),
          takeUntilDestroyed(this.destroyRef$$)
        )
        .subscribe({
          next: (twoFactor) => {
            if (twoFactor) {
              this.matDialog.open(TwoFactorComponent, {
                maxWidth: "400px",
                width: "90%",
                height: "350px",
                data: {
                  email: this.loginForm.value.login,
                },
                backdropClass: "backdrop-bg",
                autoFocus: false,
              });
            } else this.router.navigateByUrl("/home");
          },
        });
    }
  }
}
