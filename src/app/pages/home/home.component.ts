import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  col = 3;
  category = "milk";

  onColumnsCountChange(colsNum: number): void {
    this.col = colsNum;
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }
}
