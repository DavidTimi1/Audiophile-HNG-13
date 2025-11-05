import { ResponsiveImage } from "./definitions";


export function chooseResponsiveImage(image: ResponsiveImage){
    // if (typeof window === 'undefined') {
        return image.desktop; // Default to desktop on server-side
    // }
    
    // const width = window.innerWidth;
    
    // if (width < 768) {
    //     return image.mobile;
    // } else if (width >= 768 && width < 1024) {
    //     return image.tablet;
    // } else {
    //     return image.desktop;
    // }
}

export const toCurrency = (cents: number, currency = "USD") =>
  (cents / 100).toLocaleString(undefined, { style: "currency", currency });


export type CartItem = { price: number; quantity: number };

export function calcTotals(items: CartItem[]) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = items.length ? 5000 : 0;
  const vat = Math.round(subtotal * 0.2);
  const grandTotal = subtotal + shipping;
  return { subtotal, shipping, vat, grandTotal };
}
