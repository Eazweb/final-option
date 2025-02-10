import Container from "../container";
import { categories } from "@/utils/categories";
import CategoriesClient from "./categories-client";
import { headers } from 'next/headers';

const Categories = async () => {
  const headersList = headers();
  const category = headersList.get("x-category") || null;

  return (
    <CategoriesClient 
      categories={categories}
      currentCategory={category}
    />
  );
};

export default Categories;
