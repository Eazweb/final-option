import Image from "next/image";

const skinProblems = [
  {
    id: 1,
    image: "/skins/oily.jpg",
  },
  {
    id: 2,
    image: "/skins/dryskin.jpg",
  },
  {
    id: 3,
    image: "/skins/sunburn.jpg",
  },
  {
    id: 4,
    image: "/skins/aging.jpg",
  },
  {
    id: 5,
    image: "/skins/pigmentation.jpg",
  },
  {
    id: 6,
    image: "/skins/scars.jpg",
  },
  {
    id: 7,
    image: "/skins/acne.jpg",
  },
];

export default function Problems() {
  return (
    <div className="w-full py-16 ">
      <div className="max-w-[1300px] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#a7c957]">
          Common Skin Problems
        </h2>
        {/* Large Screens - Single row, 6 items */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-6">
          {skinProblems.slice(0, 6).map((problem) => (
            <div
              key={problem.id}
              className="aspect-[5/4] bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative w-full h-full">
                <Image
                  src={problem.image}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Medium Screens - Two rows, 7 items (4-3) */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-4 gap-6 mb-6">
            {skinProblems.slice(0, 4).map((problem) => (
              <div
                key={problem.id}
                className="aspect-[5/4] bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={problem.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-6">
            {skinProblems.slice(4).map((problem) => (
              <div
                key={problem.id}
                className="aspect-[5/4] bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={problem.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Small Screens - Two rows, 6 items (3-3) */}
        <div className="md:hidden">
          <div className="grid grid-cols-3 gap-4 mb-4">
            {skinProblems.slice(0, 3).map((problem) => (
              <div
                key={problem.id}
                className="aspect-[5/4] bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={problem.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {skinProblems.slice(3, 6).map((problem) => (
              <div
                key={problem.id}
                className="aspect-[5/4] bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={problem.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
