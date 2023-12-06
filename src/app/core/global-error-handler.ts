import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { customSnackDefaults } from "../shared/snack/snack";
import { SnackComponent } from "../shared/snack/snack.component";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private readonly snackbar: MatSnackBar,
    private readonly zone: NgZone
  ) {}

  public async handleError(error: any): Promise<void> {
    // eslint-disable-next-line no-console
    console.error(error);
    if (error.rejection) {
      error = error.rejection;
      setTimeout(() => {
        /**
         * noop, but required to push the queue for async error handling
         * DO NOT REMOVE
         */
      });
    }
    if (error instanceof HttpErrorResponse) {
      const message = await this.getHttpErrorMessage(error);
      this.zone.run(() => {
        this.snackbar.openFromComponent(SnackComponent, {
          ...customSnackDefaults,
          data: { message, type: "error" },
        });
      });
    }
  }

  private async getHttpErrorMessage(res: HttpErrorResponse): Promise<string> {
    const err = { ...res };
    if (err.error && err.error instanceof Blob) {
      err.error = JSON.parse(await err.error.text());
    } else {
      // todo: remove when api will be fixed
      try {
        err.error = JSON.parse(err.error);
      } catch (error) {
        err.error = res.error;
      }
    }
    if (typeof err.error === "string") {
      if (err.error.startsWith("<html>") || err.error.toLowerCase().startsWith("<!doctype html>")) {
        const content = err.error.slice(err.error.indexOf("<body>") + 6, err.error.indexOf("</body>"));
        const container = document.createElement("div");
        container.innerHTML = content;
        return container.innerText;
      }
      return err.error;
    }
    return err.error?.error_description[0] || err.error?.message || err.message;
  }
}
