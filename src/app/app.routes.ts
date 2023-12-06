import { Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { HomeComponent } from "./home/home.component";
import { CUSTOM_SNACK_PROVIDERS } from "./shared/snack/snack";

export const routes: Routes = [
  {
    path: "auth",
    pathMatch: "full",
    providers: [CUSTOM_SNACK_PROVIDERS],

    component: AuthComponent,
  },
  { path: "home", pathMatch: "full", providers: [CUSTOM_SNACK_PROVIDERS], component: HomeComponent },
  // { path: "contact", pathMatch: "full", component: ContactComponent },
];
