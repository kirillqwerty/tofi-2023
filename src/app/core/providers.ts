import { EnvironmentProviders, LOCALE_ID, Provider } from "@angular/core";
import { API_CONFIG, baseApiConfig } from "./api-config";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authInterceptor } from "./auth-interceptor";
import { provideErrorHandler } from "./error-handler.providers";
import { ModeToggleService } from "../shared/theme-mode/theme-mode.service";
import { MODE_STORAGE_SERVICE, ModeLocalStorageService } from "../shared/theme-mode/theme-mode-storage.service";
import { registerLocaleData } from "@angular/common";
import localeRu from "@angular/common/locales/ru";

registerLocaleData(localeRu, "ru");

const CORE_PROVIDERS: (Provider | EnvironmentProviders)[] = [
  { provide: LOCALE_ID, useValue: "ru" },
  { provide: API_CONFIG, useValue: baseApiConfig },
  provideHttpClient(withInterceptors([authInterceptor])),
  provideErrorHandler(),
  ModeToggleService,
  {
    provide: MODE_STORAGE_SERVICE,
    useClass: ModeLocalStorageService,
  },
];

export default CORE_PROVIDERS;
