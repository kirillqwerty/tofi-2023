import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { AuthMode } from "./auth-mode";
import { RegistrationComponent } from "./registration/registration.component";
import { AuthScreenComponent } from "./auth-screen/auth-screen.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {ThemeModeComponent} from "../shared/theme-mode/theme-mode.component";

@Component({
  selector: "app-auth",
  standalone: true,
	imports: [
		CommonModule,
		LoginComponent,
		MatInputModule,
		MatButtonModule,
		MatRippleModule,
		RegistrationComponent,
		AuthScreenComponent,
		MatProgressSpinnerModule,
		ThemeModeComponent,
	],
  templateUrl: "./auth.component.html",
  styleUrl: "./auth.component.scss",
})
export class AuthComponent {
  public authMode = AuthMode.login;
  public isLoading = false;
  public switchMode(): void {
    if (this.authMode === AuthMode.login) {
      this.authMode = AuthMode.reg;
    } else {
      this.authMode = AuthMode.login;
    }
  }

  public handleLoading(cond: boolean): void {
    this.isLoading = cond;
    console.log(this.isLoading);
  }

  protected readonly AuthMode = AuthMode;
}
