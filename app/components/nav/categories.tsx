import { categories } from "@/utils/categories";
import CategoriesClient from "./categories-client";

const Categories = () => {
  return (
    <CategoriesClient 
      categories={categories}
    />
  );
};

export default Categories;
