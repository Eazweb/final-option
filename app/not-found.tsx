import { Suspense } from 'react';
import Container from './components/container';
import Link from 'next/link';

export const dynamic = "force-dynamic";


export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <div className="h-[60vh] flex flex-col gap-4 items-center justify-center">
          <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
          <p>Could not find the requested resource</p>
          <Link 
            href="/"
            className="text-slate-500 underline hover:text-slate-800"
          >
            Return Home
          </Link>
        </div>
      </Container>
    </Suspense>
  );
} 