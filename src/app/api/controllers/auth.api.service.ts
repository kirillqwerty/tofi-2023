import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ConfirmOtpRequest, JwtToken, Login, RegisterUserRequest } from "../../models";
import { ApiService } from "../../core/api.service";

@Injectable({
  providedIn: "root",
})
export class AuthApiService extends ApiService {
  public login(body: Login): Observable<JwtToken> {
    const url = `/auth/login`;
    return this.http.post<JwtToken>(url, body);
  }

  public register(body: RegisterUserRequest): Observable<unknown> {
    const url = `/auth/register`;
    return this.http.post(url, body);
  }

  public confirmOpt(body: ConfirmOtpRequest): Observable<JwtToken> {
    const url = `/auth/confirm_otp`;
    return this.http.post<JwtToken>(url, body, { withCredentials: true });
  }

  public refreshOpt(): Observable<JwtToken> {
    const url = `/auth/refresh_otp`;
    return this.http.get<JwtToken>(url, { withCredentials: true });
  }
}
