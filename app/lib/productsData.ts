import productsData from '../../public/assets/db.json';
import { CategoryKey, Product, ProductBrief } from './definitions';
import { chooseResponsiveImage } from './utils';


// Data extraction functions
export function getProducts(): Product[] {
    return productsData.data as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
    return productsData.data.find(product => product.slug === slug) as Product | undefined;
}

export function getProductsByCategory(category: CategoryKey): Product[] {
    return productsData.data.filter(product => product.category === category) as Product[];
}

export function getNewProducts(): Product[] {
    return productsData.data.filter(product => product.new) as Product[];
}

export function getSimilarProducts(productSlug: string): ProductBrief[] {
    const product = getProductBySlug(productSlug);
    return product?.others || [] as ProductBrief[];
}

// Category summary for navigation/display
export type CategorySummary = {
    key: CategoryKey;
    name: string;
    count: number;
};

export function getCategorySummaries(): CategorySummary[] {
    const categories = getCategories().map(cat => cat.label.toLowerCase() as CategoryKey);
    const summary = categories.map(category => ({
        key: category,
        name: category.charAt(0).toUpperCase() + category.slice(1),
        count: getProductsByCategory(category).length
    }))
    return summary as CategorySummary[];
}

// Category navigation item
export type CategoryNavItem = {
    label: string;
    slug: string;
    img: string;
};

export function getCategories(): CategoryNavItem[] {
    const categoryOrder: CategoryKey[] = ['headphones', 'speakers', 'earphones'];

    return categoryOrder.map(category => {
        // Get the first product in this category to extract the categoryImage
        const firstProduct = productsData.data.find(p => p.category === category);

        return {
            label: category.toUpperCase(),
            slug: `/${category}`,
            img: firstProduct?.categoryImage ? chooseResponsiveImage(firstProduct.categoryImage) : '',
        };
    });
}