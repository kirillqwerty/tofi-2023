import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideAnimations } from "@angular/platform-browser/animations";
import { API_CONFIG, baseApiConfig } from "./core/api-config";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), { provide: API_CONFIG, useValue: baseApiConfig }],
};
