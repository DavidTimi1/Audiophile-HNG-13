"use client";
import Image from "next/image";
import Hero from "./components/Hero";
import Link from "next/link";
import CategoryGrid from "./components/home/CategoryGrid";
import AboutSection from "./components/home/AboutSection";

export default function Home() {
  return (
    <section>
      <Hero />

      <CategoryGrid />
      <section className='container px-6 lg:px-8 py-6'>
        <div className='relative overflow-hidden rounded-xl bg-primary text-white'>
          <Image
            src='/assets/home/desktop/pattern-circles.svg'
            alt=''
            width={944}
            height={944}
            aria-hidden='true'
            className='hidden sm:block absolute -top-40 -left-52 opacity-80
                 pointer-events-none select-none '
          />

          <div className='z-10 grid gap-8 lg:grid-cols-2 items-center px-8 py-12 sm:px-10 sm:py-14 lg:px-12 lg:pb-0 lg:pt-16 relative'>
            <div className='relative mx-auto h-64 w-52 sm:h-80 sm:w-64 lg:h-[400px] lg:w-[320px] lg:-mb-5'>
              <Image
                src='/assets/home/desktop/image-speaker-zx9.png'
                alt='ZX9 Speaker'
                fill
                className='object-contain drop-shadow-lg'
                priority
              />
            </div>

            <div className='max-w-md text-center lg:text-left mx-auto lg:mx-0'>
              <h2 className='heading-2 text-white'>
                ZX9
                <br />
                SPEAKER
              </h2>
              <p className='body text-white/85 mt-6 font-normal'>
                Upgrade to premium speakers that are phenomenally built to
                deliver truly remarkable sound.
              </p>
              <Link href='/speakers/zx9-speaker'>
                <button className='btn btn-secondary mt-8 relative z-10  hover:bg-black/70'>
                  See Product
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className='container px-6 lg:px-8 py-6'>
        <div
          className="
      relative overflow-hidden rounded-xl flex items-center
      bg-[url('/assets/home/mobile/image-speaker-zx7.jpg')]
      sm:bg-[url('/assets/home/tablet/image-speaker-zx7.jpg')]
      lg:bg-[url('/assets/home/desktop/image-speaker-zx7.jpg')]
      bg-cover bg-center min-h-[300px] sm:min-h-80
    "
        >
          <div className='px-8 sm:px-12 lg:px-16 py-16'>
            <h3 className='heading-4 text-black'>ZX7 SPEAKER</h3>
            <Link href='/speakers/zx7-speaker'>
              <button className='btn btn-ghost mt-6'>See Product</button>
            </Link>
          </div>
          <div className='absolute inset-0 bg-black/5 rounded-xl pointer-events-none' />
        </div>
      </section>

      <section className='container mx-auto px-6 lg:px-8 py-6'>
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='relative h-[300px] rounded-xl overflow-hidden'>
            <Image
              src='/assets/home/desktop/image-earphones-yx1.jpg'
              alt='YX1 Earphones'
              fill
              className='object-cover'
            />
          </div>

          <div className='bg-ink-100 rounded-md flex items-center'>
            <div className='px-20 py-12'>
              <h3 className='heading-4'>YX1 EARPHONES</h3>
              <Link href='/earphones/yx1-earphones'>
                <button className='btn btn-ghost mt-6'>See Product</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <AboutSection />
    </section>
  );
}
