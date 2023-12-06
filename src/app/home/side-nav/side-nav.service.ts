import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SideNavService {
  private isExpanded$$ = new Subject<boolean>();

  public expand(): void {
    this.isExpanded$$.next(true);
  }

  public close(): void {
    this.isExpanded$$.next(false);
  }

  public getSideNavState(): Observable<boolean> {
    return this.isExpanded$$.asObservable();
  }
}
