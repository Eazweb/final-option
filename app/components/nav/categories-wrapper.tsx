"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CategoriesComponent = dynamic(() => import('./categories'), {
  ssr: false
});

const CategoriesWrapper = () => {
  return (
    <Suspense fallback={<div className="hidden sm:block border-b-[0.5px] bg-slate-300 h-[51px]" />}>
      <CategoriesComponent />
    </Suspense>
  );
};

export default CategoriesWrapper; 