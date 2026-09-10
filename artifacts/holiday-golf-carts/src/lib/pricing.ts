import { InventoryCart } from "@workspace/api-client-react";

export const NEW_VEHICLE_DISCOUNT = 1000;
export const USED_VEHICLE_DISCOUNT = 500;
export const USED_VEHICLE_MINIMUM_PRICE = 5000;

export function eventDiscount(
  cart: Pick<InventoryCart, "condition" | "price">,
) {
  const condition = String(cart.condition ?? "")
    .trim()
    .toLowerCase();
  if (cart.price == null) return 0;
  if (condition === "new") return NEW_VEHICLE_DISCOUNT;
  if (condition === "used" && cart.price >= USED_VEHICLE_MINIMUM_PRICE)
    return USED_VEHICLE_DISCOUNT;
  return 0;
}

export function eventPrice(cart: Pick<InventoryCart, "condition" | "price">) {
  if (cart.price == null) return null;
  return Math.max(0, cart.price - eventDiscount(cart));
}
