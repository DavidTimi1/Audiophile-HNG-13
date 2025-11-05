"use client";

import Image from "next/image";
import Link from "next/link";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  return (
    <>
      <div
        aria-hidden='true'
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-200 lg:hidden
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      <div
        id='mobile-menu'
        role='dialog'
        aria-modal='true'
        className={`fixed left-0 right-0 top-0 z-50 lg:hidden
          transition-transform duration-300 ease-out
          ${open ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className='bg-white rounded-b-2xl shadow-xl'>
          <div className='container px-6 pt-6 pb-10'>
            <nav aria-label='Shop categories'>
              <ul className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6'>
                <li>
                  <CategoryCard
                    label='HEADPHONES'
                    href='/headphones'
                    img='/assets/shared/desktop/image-category-thumbnail-headphones.png'
                  />
                </li>
                <li>
                  <CategoryCard
                    label='SPEAKERS'
                    href='/speakers'
                    img='/assets/shared/desktop/image-category-thumbnail-speakers.png'
                  />
                </li>
                <li>
                  <CategoryCard
                    label='EARPHONES'
                    href='/earphones'
                    img='/assets/shared/desktop/image-category-thumbnail-earphones.png'
                  />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

function CategoryCard({
  label,
  href,
  img,
}: {
  label: string;
  href: string;
  img: string;
}) {
  return (
    <Link
      href={href}
      className='group block rounded-xl bg-ink-100 pt-16 pb-6 px-6 text-center focus:outline-none focus:ring-2 focus:ring-primary'
    >
      <span className='-mt-24 block relative mx-auto h-36 w-auto'>
        <Image src={img} alt='' fill sizes='144px' className='object-contain' />
      </span>

      <h3 className='heading-6 uppercase mt-1'>{label}</h3>

      <span className='mt-3 inline-flex items-center gap-2 text-black/60 text-subtitle tracking-[1px] font-semibold uppercase group-hover:text-primary'>
        Shop
        <Image
          src='/assets/shared/desktop/icon-arrow-right.svg'
          alt=''
          width={8}
          height={8}
          className='w-2 h-2'
        />
      </span>
    </Link>
  );
}
