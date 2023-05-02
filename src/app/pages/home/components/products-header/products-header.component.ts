import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent {
  @Output() columnCountChange = new EventEmitter<number>();
  sort = "desc";
  itemShowCount = 12;

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    console.log(this.sort);
  }

  onItemsUpdate(count: number): void {
    this.itemShowCount = count;
    console.log(this.itemShowCount);
  }

  onColumnsUpdate(colsNum: number): void {
    this.columnCountChange.emit(colsNum);
  }
}
