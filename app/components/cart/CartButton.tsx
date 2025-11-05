"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getSessionID } from "../../lib/sessionID";
import CartModal from "./CartModal";
import { useState } from "react";
import Image from "next/image";

export default function CartButton() {
  const [open, setOpen] = useState(false);
  const sessionID = getSessionID();
  const cart = useQuery(api.cart.get, { sessionID }) || { items: [] };

  const count = cart.items.reduce((n: number, i: any) => n + i.quantity, 0);

  return (
    <>
      <button aria-label='Open cart' onClick={() => setOpen(true)}>
        <Image
          src='/assets/shared/desktop/icon-cart.svg'
          alt={"Cart"}
          width={200}
          height={200}
          className='w-6 h-6'
        />
        {count > 0 && <span className='sr-only'>{count} items</span>}
      </button>
      <CartModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
