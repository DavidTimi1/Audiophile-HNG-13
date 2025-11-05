import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className='bg-ink-900 text-white mt-20'>
      <div className='container px-6 lg:px-8 pb-10'>
        <div className='flex flex-col gap-8'>
          <div className='w-24 h-1 bg-primary' />

          <div className='flex flex-col pt-10 lg:flex-row lg:items-center lg:justify-between gap-6'>
            <Link href='/' className='inline-block'>
              <Image
                src='/assets/shared/desktop/logo.svg'
                alt='Audiophile'
                width={143}
                height={25}
              />
            </Link>
            <ul className='flex flex-wrap gap-6 lg:gap-8 text-subtitle tracking-[2px] font-bold uppercase'>
              <li>
                <Link href='/' className='hover:text-primary'>
                  Home
                </Link>
              </li>
              <li>
                <Link href='/headphones' className='hover:text-primary'>
                  Headphones
                </Link>
              </li>
              <li>
                <Link href='/speakers' className='hover:text-primary'>
                  Speakers
                </Link>
              </li>
              <li>
                <Link href='/earphones' className='hover:text-primary'>
                  Earphones
                </Link>
              </li>
            </ul>
          </div>

          <div className='grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end'>
            <p className='font-normal text-white/60 max-w-3xl'>
              Audiophile is an all in one stop to fulfill your audio needs.
              We’re a small team of music lovers and sound specialists who are
              devoted to helping you get the most out of personal audio. Come
              and visit our demo facility – we’re open 7 days a week.
            </p>

            <div className='flex gap-4 justify-start lg:justify-end'>
              {/* Facebook */}
              <Link href='#' aria-label='Facebook' className='group'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  className='size-6 text-white transition-colors duration-200 group-hover:text-primary'
                >
                  <path
                    d='M22.675 0H1.325A1.32 1.32 0 0 0 0 1.326v21.348C0 23.407.593 24 1.325 
      24h11.495v-9.294H9.691V11.01h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788
      1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 
      0-1.795.716-1.795 1.763v2.312h3.587l-.467 3.696h-3.12V24h6.116
      c.73 0 1.324-.593 1.324-1.326V1.326C24 
      .593 23.407 0 22.675 0z'
                  />
                </svg>
              </Link>
              {/* Twitter */}
              <Link href='#' aria-label='Twitter' className='group'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='20'
                  fill='currentColor'
                  viewBox='0 0 24 20'
                  className='size-6 text-white transition-colors duration-200 group-hover:text-primary'
                >
                  <path
                    d='M24 2.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 
      2.165-2.724 9.865 9.865 0 0 1-3.127 1.195A4.916 
      4.916 0 0 0 16.616 0c-2.73 0-4.944 2.215-4.944 
      4.945 0 .388.044.765.128 1.124C7.728 5.91 4.1 
      3.936 1.671.905a4.936 4.936 0 0 0-.666 
      2.485c0 1.71.87 3.214 2.188 
      4.096a4.904 4.904 0 0 1-2.239-.618v.062c0 
      2.385 1.693 4.374 3.946 
      4.827a4.935 4.935 0 0 1-2.224.084c.626 
      1.955 2.444 3.379 4.6 
      3.419A9.867 9.867 0 0 1 0 
      17.542a13.933 13.933 0 0 0 7.548 
      2.212c9.056 0 14.01-7.507 14.01-14.01 
      0-.213-.004-.425-.014-.636A10.025 10.025 0 0 0 24 
      2.557z'
                  />
                </svg>
              </Link>
              {/* Instagram */}
              <Link href='#' aria-label='Instagram' className='group'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  className='size-6 text-white transition-colors duration-200 group-hover:text-primary'
                >
                  <path d='M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2zm0-2A7.75 7.75 0 0 0 0 7.75v8.5A7.75 7.75 0 0 0 7.75 24h8.5A7.75 7.75 0 0 0 24 16.25v-8.5A7.75 7.75 0 0 0 16.25 0h-8.5z' />
                  <path d='M12 7.25A4.75 4.75 0 1 1 7.25 12 4.76 4.76 0 0 1 12 7.25m0-2A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25zm6.75-.75a1.5 1.5 0 1 1-1.5 1.5 1.5 1.5 0 0 1 1.5-1.5z' />
                </svg>
              </Link>{" "}
            </div>
          </div>

          <div className='flex flex-col lg:flex-row font-normal text-white/60 lg:items-center lg:justify-between gap-4 text-sm'>
            <p>Copyright 2021. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
