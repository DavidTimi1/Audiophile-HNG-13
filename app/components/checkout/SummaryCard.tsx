"use client";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getSessionID } from "../../lib/sessionID";
import { calcTotals } from "../../lib/utils";
import { toCurrency } from "@/app/lib/utils";

export default function SummaryCard() {
  const sessionID = getSessionID();
  const cart = useQuery(api.cart.get, { sessionID }) || { items: [] };
  const t = calcTotals(cart.items);

  return (
    <aside className='bg-white rounded-xl p-6 md:p-8 h-fit sticky top-6'>
      <h3 className='heading-6'>SUMMARY</h3>

      <ul className='mt-6 space-y-4'>
        {cart.items.map((i: any) => (
          <li key={i.slug} className='flex items-center gap-4'>
            <div className='relative w-16 h-16 rounded-lg overflow-hidden bg-ink-100 shrink-0'>
              <Image
                src={i.image}
                alt={i.name}
                fill
                sizes='64px'
                className='object-cover'
              />
            </div>
            <div className='flex-1'>
              <p className='font-semibold leading-tight'>{i.name}</p>
              <p className='text-black/50 text-sm'>{toCurrency(i.price)}</p>
            </div>
            <span className='text-black/50 text-sm'>x{i.quantity}</span>
          </li>
        ))}
      </ul>

      <div className='mt-6 space-y-3'>
        <Row label='TOTAL' value={toCurrency(t.subtotal)} />
        <Row label='SHIPPING' value={toCurrency(t.shipping)} />
        <Row label='VAT (INCLUDED)' value={toCurrency(t.vat)} />
      </div>

      <div className='mt-6 pt-4 '>
        <Row
          label='GRAND TOTAL'
          value={toCurrency(t.grandTotal)}
          bold
          primary
        />
      </div>

      <button
        type='submit'
        form='checkout-form'
        className='btn btn-primary w-full mt-6'
      >
        CONTINUE{" "}
      </button>
    </aside>
  );
}

function Row({
  label,
  value,
  bold,
  primary,
}: {
  label: string;
  value: string;
  bold?: boolean;
  primary?: boolean;
}) {
  return (
    <div className='flex items-center justify-between'>
      <span className='text-black/50 uppercase tracking-widest text-xs'>
        {label}
      </span>
      <span
        className={[
          bold ? "font-extrabold" : "font-semibold",
          primary ? "text-primary" : "",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}
