"use client"

import { Dancing_Script } from "next/font/google"
import Image from "next/image"

const sussyFont = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
})

export const BeautyComponent = () => {
  return (
    <div className="relative w-full mt-5 min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://res.cloudinary.com/dzrsboari/image/upload/v1741092423/anotherhero_rrnd5g.webp"
          fill
          className="object-cover rounded-xl brightness-105"
          alt="Beauty background"
          priority
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-6xl px-4">
        <div className="text-center">
          <h2 className={`${sussyFont.className} text-2xl md:text-4xl text-red-600 mb-4`}>
            About Company
          </h2>

          <h3 className="text-3xl md:text-4xl font-extralight text-[#4a6741] mb-8 leading-tight">
            NATURAL ORGANIC COSMETICS WITH 100% SAFETY
          </h3>

          {/* Icons section */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 pt-6">
            {[
              { 
                src: "/beautyComponent/1.webp", 
                alt: "Natural Beauty", 
                label: "Natural Beauty" 
              },
              { 
                src: "/beautyComponent/2.webp", 
                alt: "Natural Ingredients", 
                label: "Best Ingredients" 
              },
              { 
                src: "/beautyComponent/3.webp", 
                alt: "100% Organic", 
                label: "100% Safe" 
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center space-y-3"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 lg:h-32 lg:w-32  flex items-center justify-center">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={100}
                    height={100}
                    className="opacity-80 object-contain"
                  />
                </div>
                <span className="text-md md:text-lg text-gray-600 drop-shadow-lg">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BeautyComponent