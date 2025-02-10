"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { headers } from 'next/headers';

type useCategiesProps = {
  label: string;
};

const useCategories = ({ label }: useCategiesProps) => {
  const router = useRouter();
  const headersList = headers();
  const currentCategory = headersList.get("x-category");

  const handleChangeCategory = useCallback(() => {
    if (label === "All") {
      router.push("/");
    } else {
      // Set the category in the header and navigate
      router.push(`/?category=${label}`);
    }
  }, [label, router]);

  return { handleChangeCategory };
};

export default useCategories;
