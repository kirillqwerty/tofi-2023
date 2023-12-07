import { InjectionToken } from "@angular/core";

export const baseApiConfig = {
  mock: "/mockapi",
  prism: "/prism",
  root: "https://tofi.onrender.com/api", // TODO: if prod
  // root: "/local", // TODO: if dev
};

export interface ApiConfig {
  root: string;
  prism: string;
  mock: string;
}

export const API_CONFIG = new InjectionToken<ApiConfig>("API config");
