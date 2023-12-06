import { ChangeDetectorRef, Component, DestroyRef, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BackendService } from "../../api/backend.service";
import { RegisterUserRequest } from "../../models";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { finalize } from "rxjs";

@Component({
  selector: "app-registration",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
  templateUrl: "./registration.component.html",
  styleUrl: "./registration.component.scss",
})
export class RegistrationComponent {
  @Output() public switcher = new EventEmitter();
  @Output() public isLoading = new EventEmitter();

  public regForm = this.fb.group({
    lastName: this.fb.control("", [Validators.required]),
    firstName: this.fb.control("", [Validators.required]),
    middleName: this.fb.control("", [Validators.required]),
    email: this.fb.control("", [Validators.required, Validators.email]),
    phoneNumber: this.fb.control("", [Validators.required]),
    password: this.fb.control("", [Validators.required]),
    passwordRepeat: this.fb.control("", [Validators.required]),
    isTwoFactorAuth: this.fb.control(false),
  });

  constructor(
    private fb: FormBuilder,
    private destroyRef$$: DestroyRef,
    public router: Router,
    public back: BackendService,
    public cdr: ChangeDetectorRef
  ) {}

  public signUp(): void {
    console.log(this.regForm.value);
    this.isLoading.emit(true);

    const body: RegisterUserRequest = {
      full_name: `${this.regForm.value.lastName} ${this.regForm.value.firstName} ${this.regForm.value.middleName}`,
      email: this.regForm.value.email || "",
      phone_number: this.regForm.value.phoneNumber || "",
      password: this.regForm.value.password || "",
      is_enabled: true,
      two_factor_auth: this.regForm.value.isTwoFactorAuth as boolean,
    };
    this.back.auth
      .register(body)
      .pipe(
        finalize(() => {
          this.isLoading.emit(false);
          this.cdr.detectChanges();
        }),
        takeUntilDestroyed(this.destroyRef$$)
      )
      .subscribe({
        next: () => {
          this.switchToLogin();
        },
      });
  }
  public switchToLogin(): void {
    this.switcher.emit();
  }
}
