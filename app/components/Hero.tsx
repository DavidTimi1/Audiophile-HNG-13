"use client";
import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";

const Hero = () => {
  return (
    <section
      className="
    text-white w-screen min-h-dvh
    bg-[url('/assets/home/mobile/image-header.jpg')]
    sm:bg-[url('/assets/home/tablet/image-header.jpg')]
    lg:bg-[url('/assets/home/desktop/image-hero.jpg')]
    bg-no-repeat bg-cover
    bg-center lg:bg-position-[right_center]
  "
    >
      <Navbar />
      <section className='container w-full px-6 lg:px-8'>
        <div
          className='
        py-20 sm:py-24 lg:py-28
        max-w-xl
        flex flex-col gap-6
        text-center lg:text-left
        mx-auto lg:mx-0
      '
        >
          <p className='overline text-white/70'>NEW PRODUCT</p>
          <h1 className='heading-1 text-white'>
            XX99 MARK II <br className='hidden md:block' /> HEADPHONES
          </h1>
          <p className='body text-white/75 max-w-sm md:max-w-none font-medium mx-auto md:mx-0'>
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <Link href='/headphones/xx99-mark-two-headphones' className='mx-auto md:mx-0'>
            <button className='btn btn-primary mt-2'>See Product</button>
          </Link>
        </div>
      </section>
    </section>
  );
};

export default Hero;
