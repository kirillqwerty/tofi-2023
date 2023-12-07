import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateDepositDto, Deposit } from "../../models";
import { ApiService } from "../../core/api.service";

@Injectable({
  providedIn: "root",
})
export class DepositApiService extends ApiService {
  public override get root(): string {
    // return `${this.apiConfig.root}/users`;
    return "users";
  }

  public getUserDeposits(userId: number): Observable<Deposit[]> {
    const url = `${this.root}/${userId}/deposit`;
    return this.http.get<Deposit[]>(url, { withCredentials: true });
  }

  public createDeposit(userId: number, body: CreateDepositDto): Observable<unknown> {
    const url = `${this.root}/${userId}/deposit`;
    return this.http.post<unknown>(url, body, { withCredentials: true });
  }

  public closeDeposit(userId: number, depositId: number): Observable<unknown> {
    const url = `${this.root}/${userId}/deposit/${depositId}/close`;
    // return this.http.get<unknown>(url);
    return this.http.post<unknown>(url, { withCredentials: true });
  }
}
