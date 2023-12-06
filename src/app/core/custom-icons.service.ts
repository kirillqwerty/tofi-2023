import { Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
	providedIn: "root",
})
export class CustomIconsService {
	constructor(private readonly matIconRegistry: MatIconRegistry, private readonly domSanitizer: DomSanitizer) {}

	/**
	 * Any custom icons go here
	 */
	public initIcons(): void {
		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"trash_delete",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/trash_delete.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"plus_sign",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/plus_sign.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"minus_sign",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/minus_sign.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"left_back",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/left_back.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"right_next",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/right_next.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"calendar",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/calendar.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"chevron_down",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/chevron_down.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"nested_arrow",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/nested_arrow.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"check_done",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/check_done.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"check_undone",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/check_undone.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"cancel",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/cancel.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"error_circle_rounded",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/error_circle_rounded.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"edit",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/edit.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"chevron_up_S",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/chevron_up_S.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"chevron_down_S",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/chevron_down_S.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"export_download",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/export_download.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"logout",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/logout.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"indetermine_checkbox",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/indetermine_checkbox.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"warning",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/warning.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"search",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/search.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"chevron_right",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/chevron_right.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"chevron_left",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/chevron_left.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"verified",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/verified.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"arrow_drop_down",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/arrow_drop_down.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"block",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/block.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"union",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/union.svg")
		);
		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"lock_reset",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/lock_reset.svg")
		);
		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"list",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/list.svg")
		);

		this.matIconRegistry.addSvgIconInNamespace(
			"i",
			"info",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/info.svg")
		);
	}
}
