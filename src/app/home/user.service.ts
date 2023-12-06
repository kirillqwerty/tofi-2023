import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private _currentUserId?: number;
  constructor() {}

  public set currentUserId(id: number) {
    this._currentUserId = id;
  }

  public get currentUserId(): number {
    return 19;
    // return this._currentUserId as number;
  }
}
