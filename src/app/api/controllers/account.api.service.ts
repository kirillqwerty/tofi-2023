import { Injectable } from "@angular/core";
import { ApiService } from "../../core/api.service";
import { Account, CreateAccountDto, JwtToken, Login, TransferRequest } from "../../models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AccountApiService extends ApiService {

  public override get root(): string {
    // return `${this.apiConfig.root}/users`;
    return "users";
  }

  public getUserAccounts(userId: number): Observable<Account[]> {
    const url = `${this.root}/${userId}/accounts`;
    return this.http.get<Account[]>(url, { withCredentials: true });
  }

  public createAccount(userId: number, body: CreateAccountDto): Observable<unknown> {
    const url = `${this.root}/${userId}/accounts`;
    return this.http.post<unknown>(url, body, { withCredentials: true });
  }

  public replenishAccount(userId: number, accountId: number): Observable<unknown> {
    const url = `${this.root}/${userId}/accounts/${accountId}/add_money`;
    // return this.http.get<unknown>(url);
    return this.http.get<unknown>(url, { withCredentials: true });
  }

  public cashOutAccount(userId: number, accountId: number): Observable<unknown> {
    const url = `${this.root}/${userId}/accounts/${accountId}/no_money`;
    // return this.http.get<unknown>(url);
    return this.http.get<unknown>(url, { withCredentials: true });
  }

  public transfer(userId: number, body: TransferRequest): Observable<unknown> {
    const url = `${this.root}/${userId}/accounts/transfer`;
    return this.http.post<unknown>(url, body, { withCredentials: true });
  }

  public blockAccount(userId: number, accountId: number, isBlocked: boolean): Observable<unknown> {
    const url = `${this.root}/${userId}/account/${accountId}/status`;
    return this.http.patch<unknown>(
      url,
      {},
      {
        params: { is_blocked: isBlocked },
        withCredentials: true,
      }
    );
  }
}
