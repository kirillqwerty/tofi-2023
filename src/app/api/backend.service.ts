import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthApiService } from "./controllers/auth.api.service";
import { AccountApiService } from "./controllers/account.api.service";
import { CreditApiService } from "./controllers/credit.api.service";
import { DepositApiService } from "./controllers/deposit.api.service";

@Injectable({
  providedIn: "root",
})
export class BackendService {
  public readonly auth = inject(AuthApiService);
  public readonly account = inject(AccountApiService);
  public readonly deposit = inject(DepositApiService);
  public readonly credit = inject(CreditApiService);
}
