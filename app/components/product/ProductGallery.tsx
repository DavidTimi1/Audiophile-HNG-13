import Image from "next/image";

export function ProductGallery({ imgs }: { imgs: string[] }) {
  return (
    <section className='container px-6 lg:px-8 pt-16'>
      <div
        className='
          grid gap-6
          lg:grid-cols-2
          lg:grid-rows-[repeat(2,284px)]
        '
      >
        <figure
          className='
            relative overflow-hidden rounded-xl
            aspect-4/3 sm:aspect-16/10
            lg:aspect-auto lg:h-full
                  '
        >
          <Image
            src={imgs[0]}
            alt='gallery 1'
            fill
            sizes='(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw'
            className='object-cover'
            priority
          />
        </figure>

        <figure
          className='
            relative overflow-hidden rounded-xl
              aspect-4/3 sm:aspect-16/10
          lg:aspect-auto lg:h-full
              lg:row-span-2
         
          '
        >
          <Image
            src={imgs[2]}
            alt='gallery 2'
            fill
            sizes='(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw'
            className='object-cover'
          />
        </figure>

        <figure
          className='
            relative overflow-hidden rounded-xl
            aspect-3/4 sm:aspect-4/3
            lg:aspect-auto lg:h-full
         '
        >
          <Image
            src={imgs[1]}
            alt='gallery 3'
            fill
            sizes='(min-width:1024px) 50vw, 100vw'
            className='object-cover'
          />
        </figure>
      </div>
    </section>
  );
}
