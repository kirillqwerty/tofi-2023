import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ConfirmOtpRequest, JwtToken, Login, RegisterUserRequest } from "../../models";
import { ApiService } from "../../core/api.service";
import { TOKEN_KEY } from "../../constants/constants";

@Injectable({
  providedIn: "root",
})
export class AuthApiService extends ApiService {
  public override get root(): string {
    return `/auth`;
  }

  public login(body: Login): Observable<JwtToken> {
    const url = `/auth/login`;
    return this.http.post<JwtToken>(url, body);
  }

  public register(body: RegisterUserRequest): Observable<unknown> {
    const url = `${this.root}/register`;
    return this.http.post(url, body);
  }

  public confirmOpt(body: ConfirmOtpRequest): Observable<JwtToken> {
    const url = `${this.root}/confirm_otp`;
    return this.http.post<JwtToken>(url, body, { withCredentials: true });
  }

  public refreshOpt(): Observable<JwtToken> {
    const url = `${this.root}/refresh_otp`;
    return this.http.get<JwtToken>(url, { withCredentials: true });
  }
}
