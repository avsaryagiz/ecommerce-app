import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { Product } from "../../sanity.types";

export interface BasketItem {
  product: Product;
  quantity: number;
}

export interface AddItemFn {
  (product: Product): void;
}

export interface RemoveItemFn {
  (productId: string): void;
}

export interface ClearBasketFn {
  (): void;
}

export interface GetTotalPriceFn {
  (): number;
}

export interface GetItemCountFn {
  (productId: string): number;
}

export interface GetGroupedItemsFn {
  (): BasketItem[];
}

interface BasketState {
  items: BasketItem[];
  addItem: AddItemFn;
  removeItem: RemoveItemFn;
  clearBasket: ClearBasketFn;
  getTotalPrice: GetTotalPriceFn;
  getItemCount: GetItemCountFn;
  getGroupedItems: GetGroupedItemsFn;
}

type BasketPersist = PersistOptions<BasketState>;

const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product) =>
        set((state: BasketState) => {
          const existingItem = state.items.find(
            (item: BasketItem) => item.product._id === product._id,
          );
          if (existingItem) {
            return {
              items: state.items.map((item: BasketItem) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),
      removeItem: (productId: string) =>
        set((state: BasketState) => ({
          items: state.items.reduce((acc: BasketItem[], item: BasketItem) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as BasketItem[]),
        })),
      clearBasket: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce(
          (total: number, item: BasketItem) =>
            total + (item.product.price ?? 0) * item.quantity,
          0,
        );
      },
      getItemCount: (productId: string) => {
        const item = get().items.find(
          (item: BasketItem) => item.product._id === productId,
        );
        return item ? item.quantity : 0;
      },
      getGroupedItems: () => get().items,
    }),
    {
      name: "basket-store",
    } as BasketPersist,
  ),
);

export default useBasketStore;
