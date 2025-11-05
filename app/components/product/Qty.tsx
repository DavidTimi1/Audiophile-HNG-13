"use client";
import { useState } from "react";

export default function Qty({ onChange }: { onChange?: (v: number) => void }) {
  const [q, setQ] = useState(1);
  const bump = (d: number) => {
    const v = Math.max(1, q + d);
    setQ(v);
    onChange?.(v);
  };
  return (
    <div className='qty'>
      <button
        aria-label='Decrease quantity'
        className='qty__btn'
        onClick={() => bump(-1)}
      >
        -
      </button>
      <span className='qty__value'>{q}</span>
      <button
        aria-label='Increase quantity'
        className='qty__btn'
        onClick={() => bump(1)}
      >
        +
      </button>
    </div>
  );
}
