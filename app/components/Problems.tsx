import Image from "next/image";
import Link from "next/link";
import FadeInWrapper from "./FadeInWrapper";

const skinProblems = [
  {
    id: 1,
    image: "/skins/oily.jpg",
    link: "/product/67abfb61ef1ff3c520fb020b",
    title: "Oily Skin"
  },
  {
    id: 2,
    image: "/skins/dryskin.jpg",
    link: "/product/67abfb0def1ff3c520fb020a",
    title: "Dry Skin"
  },
  {
    id: 3,
    image: "/skins/sunburn.jpg",
    link: "/product/67abfcd9ef1ff3c520fb020d",
    title: "Sunburn"
  },
  {
    id: 4,
    image: "/skins/pigmentation.jpg",
    link: "/product/67ac0aedef1ff3c520fb0213",
    title: "Pigmentation"
  },
  {
    id: 5,
    image: "/skins/scars.jpg",
    link: "/product/67abfa1aef1ff3c520fb0208",
    title: "Scars"
  },
  {
    id: 6,
    image: "/skins/dullskin.jpg",
    link: "/product/67b83c0435ecaee5e9e3046c",
    title: "Acne"
  },
];

export default function Problems() {
  return (
    <div className="w-full py-5">
      <div className="max-w-[1300px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-5 text-[#a7c957]">
            Common Skin Problems
          </h2>

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {skinProblems.map((problem, index) => (
              <Link
                href={problem.link}
                className="aspect-[5/4] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={problem.image}
                    alt={problem.title}
                    fill
                    sizes="(max-width: 768px) 33vw, (max-width: 1200px) 50vw, 16.67vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="eager"
                    priority={index < 3}
                  />
                </div>
              </Link>
          ))}
        </div>
      </div>
    </div>
  );
}