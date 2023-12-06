import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Router, RouterOutlet} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CustomIconsService} from "./core/custom-icons.service";
import {Mode} from "./shared/theme-mode/theme-mode.model";
import {ModeToggleService} from "./shared/theme-mode/theme-mode.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, AuthComponent, HttpClientModule],

  providers: [HttpClientModule, HttpClient],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "bank-system";

  currentMode: Mode = Mode.LIGHT;
  constructor(
    private readonly customIconsService: CustomIconsService,
    private modeToggleService: ModeToggleService,
    private router: Router
  ) {
    this.customIconsService.initIcons();
    this.router.navigateByUrl("auth");
    /**
     * Example code that demonstrate the modeChanged$ observable behavior and usage
     */
    this.modeToggleService.modeChanged$.subscribe((mode: Mode) => {
      this.currentMode = Mode.LIGHT;
    });
  }
}
