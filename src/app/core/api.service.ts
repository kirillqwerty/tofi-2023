import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "./api-config";
import { inject } from "@angular/core";

export abstract class ApiService {
	protected readonly http = inject(HttpClient);
	protected readonly apiConfig = inject(API_CONFIG);

	protected get root(): string {
		return this.apiConfig.root;
	}
}
