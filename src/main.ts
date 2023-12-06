import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { importProvidersFrom } from "@angular/core";
import { provideRouter, RouterModule } from "@angular/router";
import { routes } from "./app/app.routes";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import CORE_PROVIDERS from "./app/core/providers";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom([BrowserAnimationsModule]),
    CORE_PROVIDERS
  ],
}).catch((err) => console.error(err));
