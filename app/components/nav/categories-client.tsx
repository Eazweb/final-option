"use client";

import Container from "../container";
import Category from "./category";
import { usePathname } from "next/navigation";

interface CategoriesClientProps {
  categories: Array<{
    label: string;
    icon: any;
  }>;
  currentCategory: string | null;
}

const CategoriesClient: React.FC<CategoriesClientProps> = ({
  categories,
  currentCategory
}) => {
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <div className="hidden sm:block border-b-[0.5px] bg-slate-300">
      <Container>
        <div className="pt-1 flex flex-wrap items-center justify-between overlow-x-auto">
          {categories.map((item) => (
            <Category
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={
                currentCategory === item.label ||
                (currentCategory === null && item.label === "All")
              }
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CategoriesClient; 