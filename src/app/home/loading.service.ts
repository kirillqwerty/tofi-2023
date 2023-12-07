import { Injectable } from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  private _isLoading = new Subject<boolean>();
  public set isLoading(state: boolean) {
    this._isLoading.next(state);
  }

  public get isLoading(): Observable<boolean> {
    return this._isLoading.asObservable();
  }
}
