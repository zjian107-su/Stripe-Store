import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open("Item added to cart", "Close", {
      duration: 3000,
    });
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((acc, value) => acc + value, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open("Cart cleared", "Ok", {
      duration: 3000,
    });
  }

  removeFromCart(item: CartItem): void {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    this.cart.next({ items: filteredItems });
    this._snackBar.open("Item removed from cart", "Ok", { duration: 3000 });
  }

  removeQuantity(item: CartItem): void {
    this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity -= 1;
      }

      if (_item.quantity === 0) {
        this.removeFromCart(_item);
      }
    });
    this._snackBar.open("Quantity reduced from cart", "Ok", { duration: 3000 });
  }
}
