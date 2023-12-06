import { Injectable } from "@angular/core";
import { ApiService } from "../../core/api.service";
import { Observable } from "rxjs";
import {
  CreateCreditDto,
  CreateDepositDto,
  Credit,
  CreditPaymentInfoDto,
  Deposit,
  MakePaymentRequest,
} from "../../models";
@Injectable({
  providedIn: "root",
})
export class CreditApiService extends ApiService {
  public override get root(): string {
    return `${this.apiConfig.root}/users`;
  }

  public getUserCredits(userId: number): Observable<Credit[]> {
    const url = `${this.root}/${userId}/credit`;
    return this.http.get<Credit[]>(url, { withCredentials: true });
  }

  public createCredit(userId: number, body: CreateCreditDto): Observable<unknown> {
    const url = `${this.root}/${userId}/credit`;
    return this.http.post<unknown>(url, body, { withCredentials: true });
  }

  public payCredit(userId: number, creditId: number, body: MakePaymentRequest): Observable<unknown> {
    const url = `${this.root}/${userId}/credit/${creditId}/pay`;
    // return this.http.get<unknown>(url);
    return this.http.post<unknown>(url, body, { withCredentials: true });
  }

  public changeCreditStatus(
    userId: number,
    creditId: number,
    creditStatus: "NEW" | "APPROVED" | "PAID"
  ): Observable<unknown> {
    const url = `${this.root}/${userId}/credit/${creditId}/status`;
    return this.http.patch<unknown>(
      url,
      {},
      {
        params: {
          credit_status: creditStatus,
        },
        withCredentials: true,
      }
    );
  }

  public getCredit(userId: number, creditId: number): Observable<CreditPaymentInfoDto> {
    const url = `${this.root}/${userId}/credit/${creditId}`;
    return this.http.get<CreditPaymentInfoDto>(url, { withCredentials: true });
  }
}
