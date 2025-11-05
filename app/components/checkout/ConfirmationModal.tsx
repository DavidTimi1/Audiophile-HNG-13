"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { toCurrency } from "@/app/lib/utils";

type Item = {
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function ConfirmationModal({
  items,
  grandTotal,
  onClose,
}: {
  items: Item[];
  grandTotal: number;
  onClose: () => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? items : items.slice(0, 1);
  const remaining = items.length - visible.length;

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div
      className='px-10 fixed overflow-y-auto inset-0 z-50 bg-black/60 grid place-items-start md:place-items-center pt-24 py-10 md:pt-4'
      onClick={onClose}
      aria-modal='true'
      role='dialog'
    >
      <div
        className='w-full max-w-2xl bg-white rounded-xl p-6 md:p-8 shadow-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='w-16 h-16 rounded-full bg-primary text-white grid place-content-center text-2xl mb-6'>
          <svg width='24' height='24' viewBox='0 0 24 24' aria-hidden='true'>
            <path
              fill='currentColor'
              d='M9.0 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z'
            />
          </svg>
        </div>

        <h3 className='text-2xl md:text-3xl font-extrabold leading-tight'>
          THANK YOU
          <br />
          FOR YOUR ORDER
        </h3>
        <p className='text-black/60 mt-2'>
          You will receive an email confirmation shortly.
        </p>

        <div className='grid md:grid-cols-2 mt-6 overflow-hidden rounded-lg'>
          <div className='bg-ink-50 p-4 md:p-6'>
            <ul className='space-y-4'>
              {visible.map((it) => (
                <li key={it.name} className='flex items-center gap-4'>
                  <div className='relative w-12 h-12 rounded-lg overflow-hidden bg-white'>
                    <Image
                      src={it.image}
                      alt={it.name}
                      fill
                      sizes='48px'
                      className='object-cover'
                    />
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm font-semibold leading-tight'>
                      {it.name}
                    </p>
                    <p className='text-xs text-black/60'>
                      {toCurrency(it.price)}
                    </p>
                  </div>
                  <span className='text-sm text-black/60'>x{it.quantity}</span>
                </li>
              ))}
            </ul>

            <div className='h-px bg-black/10 my-4' />

            {items.length > 1 && (
              <button
                className='block w-full text-center text-xs font-semibold text-black/60 hover:text-black transition'
                onClick={() => setShowAll((s) => !s)}
              >
                {showAll ? "View less" : `and ${remaining} other item(s)`}
              </button>
            )}
          </div>

          <div className='bg-black text-white p-4 md:p-6 flex flex-col justify-end'>
            <p className='text-xs tracking-widest text-white/60'>GRAND TOTAL</p>
            <p className='text-xl md:text-2xl font-extrabold mt-2'>
              {toCurrency(grandTotal)}
            </p>
          </div>
        </div>

        <Link href='/' className='block mt-6'>
          <button className='btn btn-primary w-full' onClick={onClose}>
            BACK TO HOME
          </button>
        </Link>
      </div>
    </div>
  );
}
