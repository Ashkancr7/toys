// store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  id: number;
  name: string;
  price: string;
  size?: string;
  color?: string; // اضافه شدن رنگ
  image?: string;
  slug?: string;
  variantId?: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  // این پایین id ها رو کردم number 👇😎
  removeFromCart: (id: number, size?: string, color?: string) => void;
  increaseQty: (id: number, size?: string, color?: string) => void;
  decreaseQty: (id: number, size?: string, color?: string) => void;
  updateQty: (id: number, size: string | undefined, color: string | undefined, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) =>
        set((state) => {
          // حالا چک می‌کنیم که هم آیدی، هم سایز و هم رنگ یکسان باشن
          const existingItem = state.items.find(
            (i) => 
              i.id === product.id && 
              (i.size ?? undefined) === (product.size ?? undefined) &&
              (i.color ?? undefined) === (product.color ?? undefined)
          );

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === product.id && 
                (i.size ?? undefined) === (product.size ?? undefined) &&
                (i.color ?? undefined) === (product.color ?? undefined)
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          return { items: [...state.items, { ...product, quantity: 1 }] };
        }),

      removeFromCart: (id, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(
              i.id === id && 
              (i.size ?? undefined) === (size ?? undefined) &&
              (i.color ?? undefined) === (color ?? undefined)
            )
          ),
        })),

      increaseQty: (id, size, color) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && 
            (i.size ?? undefined) === (size ?? undefined) &&
            (i.color ?? undefined) === (color ?? undefined)
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        })),

      decreaseQty: (id, size, color) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id && 
              (i.size ?? undefined) === (size ?? undefined) &&
              (i.color ?? undefined) === (color ?? undefined)
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      updateQty: (id, size, color, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id && 
              (i.size ?? undefined) === (size ?? undefined) &&
              (i.color ?? undefined) === (color ?? undefined)
                ? { ...i, quantity }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),

      totalPrice: () => {
        const { items } = get();
         return items.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
      },
    }),
    {
      name: "veloura-cart",
    }
  )
);
