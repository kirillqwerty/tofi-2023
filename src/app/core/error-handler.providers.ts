import { EnvironmentProviders, ErrorHandler, importProvidersFrom, Provider } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { GlobalErrorHandler } from "./global-error-handler";

export const provideErrorHandler = (): (EnvironmentProviders | Provider)[] => [
	importProvidersFrom(MatSnackBarModule),
	{ provide: ErrorHandler, useClass: GlobalErrorHandler },
];
