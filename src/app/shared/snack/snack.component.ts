import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Inject, Optional } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";
import { SnackPayload } from "./snack";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
  selector: "app-snack",
  standalone: true,
  styleUrls: ["./snack.component.scss"],
  templateUrl: "./snack.component.html",
})
export class SnackComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) @Optional() public readonly data: SnackPayload | null) {
    console.log(data);
  }
}
