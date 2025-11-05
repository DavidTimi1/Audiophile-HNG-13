import ProductRow from "./ProductRow";
import CategoryGrid from "../home/CategoryGrid";
import AboutSection from "../home/AboutSection";
import Navbar from "../Navbar";
import { getProductsByCategory } from "@/app/lib/productsData";
import { CategoryKey } from "@/app/lib/definitions";

export default function CategoryDisplay({ category }: { category: CategoryKey }) {
  const data = getProductsByCategory(category);
  const heroText = category.toUpperCase();

  return (
    <main className='pb-20 sm:pb-28'>
      <section className='bg-black text-white'>
        <Navbar />
        <div className='container px-6 lg:px-8 py-16 sm:py-24 animate-render'>
          <h1 className='heading-2 text-center'>{heroText}</h1>
        </div>
      </section>

      <div className='mt-20 sm:mt-24 space-y-20 sm:space-y-28 animate-render'>
        {
          data.map((p, i) => (
            <ProductRow key={p.slug} item={p} isOdd={!!( i%2)} />
          ))
        }
      </div>

      <section className='pt-24 sm:pt-28'>
        <CategoryGrid />
      </section>
      <AboutSection />
    </main>
  );
}
