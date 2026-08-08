// store/checkoutStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ShippingAddress {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
}

interface CheckoutStore {
  shippingAddress: ShippingAddress | null;
  setShippingAddress: (address: ShippingAddress) => void;
  clearShippingAddress: () => void;
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      shippingAddress: null,
      setShippingAddress: (address) => set({ shippingAddress: address }),
      clearShippingAddress: () => set({ shippingAddress: null }),
    }),
    {
      name: "checkout-storage",
    }
  )
);
