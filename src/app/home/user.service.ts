import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private _currentUserId?: number;
  private _currentUserEmail?: string;
  constructor() {}

  public set currentUserEmail(email: string) {
    this._currentUserEmail = email;
  }

  public get currentUserEmail(): string {
    // return 19;
    return this._currentUserEmail as string;
  }

  public set currentUserId(id: number) {
    this._currentUserId = id;
  }

  public get currentUserId(): number {
    // return 19;
    return this._currentUserId as number;
  }
}
