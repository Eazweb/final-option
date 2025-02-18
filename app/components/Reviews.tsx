"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/app/components/ui/infinite-moving-cards";

export default function Reviews() {
  return (
    <div className="h-[32rem] my-6 rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden gap-4">
      <InfiniteMovingCards
        items={testimonials1}
        direction="right"
        speed="slow"
      />
      <InfiniteMovingCards
        items={testimonials2}
        direction="left"
        speed="slow"
      />
    </div>
  );
}

const testimonials1 = [
  {
    quote:
      "This moisturizer has transformed my skin completely! Perfect for our Indian climate, it keeps my face hydrated all day without feeling heavy.",
    name: "Simran Kaur",
    title: "Verified Buyer",
    rating: 5
  },
  {
    quote:
      "The serum is amazing for my combination skin. It's lightweight and gets absorbed quickly. Seeing visible results in just 2 weeks!",
    name: "Harpreet Singh",
    title: "Skincare Enthusiast",
    rating: 5
  },
  {
    quote:
      "Finally found a sunscreen that works well in humid weather! No white cast and perfect under makeup. A bit pricey but worth it.",
    name: "Gurpreet Kaur",
    title: "Beauty Blogger",
    rating: 4
  },
  {
    quote:
      "The night cream is perfect for my dry skin. I wake up with such soft and glowing skin. Love the natural ingredients.",
    name: "Navpreet Kaur",
    title: "Regular Customer",
    rating: 5
  },
  {
    quote:
      "Best face wash for sensitive skin! No irritation at all. Just wish the bottle was slightly bigger.",
    name: "Jaspreet Singh",
    title: "Verified Buyer",
    rating: 4
  },
];

const testimonials2 = [
  {
    quote:
      "The anti-aging cream has made such a difference! My fine lines are visibly reduced. Excellent quality product.",
    name: "Rupinder Kaur",
    title: "Verified Buyer",
    rating: 5
  },
  {
    quote:
      "Love the herbal face pack! It gives such a natural glow and the aroma is so refreshing. Perfect for weekend self-care.",
    name: "Amandeep Singh",
    title: "Skincare Enthusiast",
    rating: 4
  },
  {
    quote:
      "The under-eye cream is a game changer! Dark circles have noticeably reduced. Worth every rupee spent.",
    name: "Manpreet Kaur",
    title: "Beauty Expert",
    rating: 5
  },
  {
    quote:
      "This toner is so gentle yet effective. My pores look visibly smaller and skin feels fresh throughout the day.",
    name: "Sukhpreet Kaur",
    title: "Regular Customer",
    rating: 5
  },
  {
    quote:
      "The vitamin C serum has brightened my skin tone significantly. Love how it's specially formulated for Indian skin.",
    name: "Rajinder Singh",
    title: "Verified Buyer",
    rating: 4
  },
];
