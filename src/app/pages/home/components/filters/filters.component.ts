import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent {
  @Output() showCategory = new EventEmitter<string>();
  categories = ["shoes", "sports"];

  onShowCategory(category: string): void {
    console.log(category);
    this.showCategory.emit(category);
    console.log("filter category");
  }
}
