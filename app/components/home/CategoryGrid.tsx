"use client";
import { getCategories } from "@/app/lib/productsData";
import Image from "next/image";
import Link from "next/link";


export default function CategoryGrid() {
  const categories = getCategories();

  return (
    <section className='container  px-6 lg:px-8 py-40'>
      <div className='grid gap-20 md:gap-6 md:grid-cols-3'>
        {
          categories.map((c) => (
            <article
              key={c.label}
              className='rounded-md pt-16 pb-6 px-6 text-center bg-ink-100 h-[204px]'
            >
              <div className='-mt-30 mx-auto w-auto h-40 relative'>
                <Image
                  src={c.img}
                  alt={c.label}
                  fill
                  className='object-contain'
                />
              </div>
              <h3 className='heading-6 uppercase'>{c.label}</h3>
              <Link
                href={c.slug}
                className='inline-flex items-center gap-2 mt-3 text-black/50 text-subtitle tracking-[1px] uppercase font-semibold hover:text-primary'
              >
                <span>Shop</span>
                <Image
                  src='/assets/shared/desktop/icon-arrow-right.svg'
                  alt='Chevron Arrow right'
                  width={25}
                  height={25}
                  className='w-2 h-auto'
                />
              </Link>
            </article>
          ))}
      </div>
    </section>
  );
}
