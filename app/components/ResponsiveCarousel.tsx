"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface CarouselItem {
  id: number;
  imageWide: string;
  imageSquare: string;
  link: string;
  alt: string;
}

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    imageWide: "/longposters/acnecomboposter.webp",
    imageSquare: "/shortposters/acnecombomobile.webp",
    link: "/product/67ac0a6fef1ff3c520fb0212",
    alt: "Carousel Image 1",
  },
  {
    id: 2,
    imageWide: "/longposters/10kposter.webp",
    imageSquare: "/shortposters/10kpostermobile.webp",
    link: "/#",
    alt: "Carousel Image 2",
  },
  {
    id: 3,
    imageWide: "/longposters/pigmentationlongposter.webp",
    imageSquare: "/shortposters/pigmentationpostermobile.webp",
    link: "/product/67ac0aedef1ff3c520fb0213",
    alt: "Carousel Image 3",
  },
];

const useCarousel = (itemsCount: number, interval: number) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % itemsCount);
    setDirection(1);
  }, [itemsCount]);

  const prevSlide = useCallback(() => {
    setActiveIndex((current) => (current - 1 + itemsCount) % itemsCount);
    setDirection(-1);
  }, [itemsCount]);

  useEffect(() => {
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [nextSlide, interval]);

  return { activeIndex, direction, nextSlide, prevSlide };
};

export default function ResponsiveCarousel() {
  const { activeIndex, direction, nextSlide, prevSlide } = useCarousel(
    carouselItems.length,
    4000
  );

  const getItemStyle = (index: number) => {
    if (index === activeIndex) return "translate-x-0";
    if (direction > 0) {
      return index < activeIndex ? "translate-x-[-100%]" : "translate-x-full";
    } else {
      return index > activeIndex ? "translate-x-full" : "translate-x-[-100%]";
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Wide Carousel (md and lg devices) */}
      <div
        className="hidden md:block relative w-full rounded-2xl"
        style={{ paddingBottom: "33.33%" }}
      >
        {carouselItems.map((item, index) => (
          <Link
            key={item.id}
            href={item.link}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${getItemStyle(
              index
            )}`}
          >
            <Image
              src={item.imageWide || "/placeholder.svg"}
              alt={item.alt}
              fill
              className="object-cover rounded-3xl"
            />
          </Link>
        ))}
      </div>

      {/* 16:9 Carousel (sm devices) */}
      <div className="md:hidden relative w-full" style={{ paddingBottom: "56.25%" }}>
        {carouselItems.map((item, index) => (
          <Link
            key={item.id}
            href={item.link}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${getItemStyle(
              index
            )}`}
          >
            <Image
              src={item.imageSquare || "/placeholder.svg"}
              alt={item.alt}
              fill
              className="object-cover rounded-xl"
            />
          </Link>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 translate-x-1/3 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/3 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}