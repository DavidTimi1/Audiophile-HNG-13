"use client";
import Image from "next/image";
import AddToCart from "./AddToCart";
const cartThumb: Record<string, string> = {
  "xx99-mark-two": "/assets/shared/desktop/image-xx99-mark-two-headphones.jpg",
  "xx99-mark-one": "/assets/shared/desktop/image-xx99-mark-one-headphones.jpg",
  xx59: "/assets/shared/desktop/image-xx59-headphones.jpg",
  "zx9-speaker": "/assets/shared/desktop/image-zx9-speaker.jpg",
  "zx7-speaker": "/assets/shared/desktop/image-zx7-speaker.jpg",
  "yx1-earphones": "/assets/shared/desktop/image-yx1-earphones.jpg",
};

export default function ProductHero({
  product,
  onAdd,
}: {
  product: {
    slug: string;
    category: string;
    name: string;
    new?: boolean;
    description: string;
    price: number;
    hero: string;
  };
  onAdd?: (qty: number) => void;
}) {
  const thumb = cartThumb[product.slug] ?? product.hero; // fallback if missing

  return (
    <section className='container px-6 lg:px-8 pt-6 animate-render'>
      <div className='grid gap-10 lg:grid-cols-2 items-center'>
        <div className='relative rounded-xl overflow-hidden bg-ink-100 h-[300px] sm:h-[420px] lg:h-[540px]'>
          <Image
            src={product.hero}
            alt={product.name}
            fill
            sizes='(min-width:1024px) 48vw, (min-width:640px) 70vw, 100vw'
            priority
            className='object-contain p-6 sm:p-10'
          />
        </div>
        <div className='max-w-xl'>
          {product.new && <p className='overline decoration-0'>NEW PRODUCT</p>}
          <h1 className='heading-3 md:heading-2 mt-3'>{product.name}</h1>
          <p className='body text-black/70 mt-6'>{product.description}</p>
          <p className='heading-6 mt-6'>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(product.price / 100)}
          </p>
          
          <AddToCart
            product={{
              slug: product.slug,
              name: product.name,
              price: product.price,
              category: product.category,
              image: thumb,
            }}
          />
        </div>
      </div>
    </section>
  );
}
