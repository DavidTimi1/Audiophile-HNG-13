"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getSessionID } from "../../lib/sessionID";
import { calcTotals } from "../../lib/utils";
import Link from "next/link";
import Image from "next/image";
import { toCurrency } from "@/app/lib/utils";

export default function CartModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const sessionID = getSessionID();
  const cart = useQuery(api.cart.get, { sessionID }) || { items: [] };
  const setQty = useMutation(api.cart.setQty);
  const clear = useMutation(api.cart.clear);

  if (!open) return null;
  const { subtotal } = calcTotals(cart.items);

  return (
    <div
      className='fixed inset-0 z-50 bg-black/60 flex items-start justify-center md:justify-end pt-24  md:pr-30 px-10 animate-render'
      onClick={onClose}
    >
      <div
        className='w-full max-w-lg bg-white rounded-md p-6 shadow-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between'>
          <h3 className='heading-5 text-black'>CART ({cart.items.length})</h3>
          <button
            className='text-black/50 hover:text-primary'
            onClick={() => clear({ sessionID })}
          >
            Remove all
          </button>
        </div>

        <ul className='mt-6 space-y-4'>
          {cart.items.map((it: any) => (
            <li key={it.slug} className='flex items-center gap-4'>
              <Image
                src={it.image}
                className='w-16 h-16 rounded-lg object-cover bg-ink-100'
                alt={it.name}
                width={500}
                height={500}
              />
              <div className='flex-1'>
                <p className='font-semibold text-black'>{it.name}</p>
                <p className='text-black/50'>{toCurrency(it.price)}</p>
              </div>
              <div className='qty px-2 py-1 h-10'>
                <button
                  className='qty__btn'
                  onClick={() =>
                    setQty({
                      sessionID,
                      slug: it.slug,
                      quantity: it.quantity - 1,
                    })
                  }
                >
                  -
                </button>
                <span className='qty__value text-black'>{it.quantity}</span>
                <button
                  className='qty__btn'
                  onClick={() =>
                    setQty({
                      sessionID,
                      slug: it.slug,
                      quantity: it.quantity + 1,
                    })
                  }
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className='flex items-center justify-between mt-6'>
          <span className='text-black/50 uppercase tracking-widest text-sm'>
            Total
          </span>
          <span className='font-bold text-black'>{toCurrency(subtotal)}</span>
        </div>

        <Link href='/checkout' onClick={onClose}>
          <button className='btn btn-primary w-full mt-6'>Checkout</button>
        </Link>
      </div>
    </div>
  );
}
