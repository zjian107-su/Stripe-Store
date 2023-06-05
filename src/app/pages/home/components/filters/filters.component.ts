import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { StoreService } from "src/app/services/store.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categorySubscription: Subscription | undefined;
  categories: Array<string> | undefined;

  constructor(private StoreService: StoreService) {}

  ngOnInit(): void {
    this.categorySubscription = this.StoreService.getAllCategories().subscribe(
      (response) => {
        this.categories = response;
      }
    );
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) this.categorySubscription.unsubscribe();
  }
}
