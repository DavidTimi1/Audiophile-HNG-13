import CategoryDisplay from "../components/category/CategoryDisplay";
import { CategoryKey } from "../lib/definitions";

// Note: params is a Promise here
type Props = { params: Promise<{ category: CategoryKey }> };

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  return <CategoryDisplay category={category} />;
}

export function generateStaticParams() {
  return ['headphones', 'speakers', 'earphones'].map((k) => ({
    category: k as CategoryKey,
  }));
}
