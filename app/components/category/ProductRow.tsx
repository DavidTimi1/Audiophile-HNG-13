import Image from "next/image";
import Link from "next/link";
import { chooseResponsiveImage } from "@/app/lib/utils";
import { Product } from "@/app/lib/definitions";

export default function ProductRow({ item, isOdd }: { item: Product, isOdd: boolean }) {
  const displayImage = chooseResponsiveImage(item.image)
  return (
    <section className='container px-6 lg:px-8 py-10'>
      <div
        className={`grid items-center gap-10 lg:gap-16 lg:grid-cols-2 ${isOdd ? "lg:[&>div:first-child]:order-2" : ""}`}
      >
        <div className='relative rounded-xl overflow-hidden bg-ink-100 h-[300px] sm:h-[360px] lg:h-[480px]'>
          <Image
            src={displayImage}
            alt={item.name}
            fill
            className='object-contain p-6 sm:p-10'
          />
        </div>

        <div className='max-w-xl mx-auto lg:mx-0 text-center lg:text-left'>
          {item.new ? <p className='overline'> New </p> : null}
          <h2 className='heading-3 md:heading-2 mt-3'>{item.name}</h2>
          <p className='body text-black/70 mt-6'>{item.description}</p>
          <Link href={item.category + '/' + item.slug}>
            <button className='btn btn-primary mt-8'>See Product</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
