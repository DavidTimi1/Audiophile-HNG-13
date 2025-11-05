import Link from "next/link";
import { notFound } from "next/navigation";
import ProductHero from "../../components/product/ProductHero";
import { ProductFeatures } from "../../components/product/ProductFeatures";
import { InTheBox } from "../../components/product/InTheBox";
import { ProductGallery } from "../../components/product/ProductGallery";
import AboutSection from "@/app/components/home/AboutSection";
import CategoryGrid from "@/app/components/home/CategoryGrid";
import Navbar from "@/app/components/Navbar";
import Recommendations from "@/app/components/product/Recommendations";
import { getProductBySlug, getProducts } from "@/app/lib/productsData";
import { CategoryKey } from "@/app/lib/definitions";
import { chooseResponsiveImage } from "@/app/lib/utils";

type Params = { category: CategoryKey; slug: string };

export async function generateStaticParams() {
  const allProducts = getProducts()
  return allProducts.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category, slug } = await params;

  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Audiophile`,
    description: product.description,
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return notFound();

  return (
    <main className='pb-20 sm:pb-28'>
      <div className='bg-black text-white'>
        <Navbar />
      </div>
      <div className='container px-6 lg:px-8 pt-6 animate-render'>
        <Link
          href={`/${category}`}
          className='text-black/60 hover:text-primary text-sm'
        >
          Go Back
        </Link>
      </div>

      <ProductHero
        product={{
          slug: product.slug,
          category: product.category,
          name: product.name,
          new: product.new,
          description: product.description,
          price: product.price,
          hero: chooseResponsiveImage(product.image),
        }}
      />

      <section className='container px-6 lg:px-8 pt-20'>
        <div className='grid gap-16 lg:grid-cols-[2fr_1fr]'>
          <ProductFeatures text={product.features} />
          <InTheBox items={product.includes} />
        </div>
      </section>

      <ProductGallery imgs={ Object.values(product.gallery).map(choices => chooseResponsiveImage(choices) )}/>

      <Recommendations items={product.others} />

      <CategoryGrid />
      <AboutSection />
    </main>
  );
}
