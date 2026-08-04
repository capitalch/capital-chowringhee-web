import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const PRODUCTS_DIR = path.join(process.cwd(), "content/products");

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  title: string;
  category: string;
  subcategory?: string;
  price: string;
  image: string;
  featured: boolean;
  releaseDate: string;
  tagline: string;
  specs: ProductSpec[];
  contentHtml: string;
};

let cachedProducts: Product[] | null = null;

export function getAllProducts(): Product[] {
  if (cachedProducts) return cachedProducts;

  const files = fs.readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith(".md"));

  const products = files.map((filename) => {
    const filePath = path.join(PRODUCTS_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const contentHtml = remark().use(remarkHtml).processSync(content).toString();

    return {
      slug: data.slug as string,
      title: data.title as string,
      category: data.category as string,
      subcategory: data.subcategory as string | undefined,
      price: data.price as string,
      image: (data.image as string) ?? "",
      featured: Boolean(data.featured),
      releaseDate: data.releaseDate as string,
      tagline: data.tagline as string,
      specs: (data.specs as ProductSpec[]) ?? [],
      contentHtml,
    };
  });

  products.sort((a, b) => a.title.localeCompare(b.title));

  cachedProducts = products;
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter((p) => p.featured);
}

export function getCategories(): string[] {
  const categories = new Set(getAllProducts().map((p) => p.category));
  return Array.from(categories);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return getAllProducts();
  return getAllProducts().filter((p) => p.category === category);
}
