"use client";
import Image from "next/image";
import React from "react";

const AboutSection = () => {
  return (
    <section className='container px-6 lg:px-8 py-20 sm:py-24'>
      <div className='grid gap-10 lg:grid-cols-2 items-center'>
        {/* Text first on mobile/tablet */}
        <div className='order-2 lg:order-1 text-center lg:text-left'>
          <h2 className='heading-2'>
            BRINGING YOU THE <span className='text-primary'>BEST</span> AUDIO
            GEAR
          </h2>
          <p className='font-normal mt-6 text-black/50'>
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
        <div className='order-1 lg:order-2 relative h-[300px] sm:h-[380px] lg:h-[460px] rounded-xl overflow-hidden'>
          <Image
            src='/assets/shared/desktop/image-best-gear.jpg'
            alt='Best audio gear'
            fill
            className='object-cover'
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
