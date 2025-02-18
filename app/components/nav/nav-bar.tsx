"use client";

import Link from "next/link";
import Container from "../container";
import React, { useState } from "react";
import { Monoton } from "next/font/google";
import CartCount from "./cart-count";
import UserMenu from "./user-menu";
import Categories from "./categories-wrapper";
import SearchBar from "./search-bar";
import { IoSearchOutline } from "react-icons/io5";
import { SafeUser } from "@/types";
import { MdArrowBackIos, MdCancel } from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const exo = Monoton({ subsets: ["latin"], weight: ["400"] });

interface NavBarPros {
  currentUser: SafeUser | null;
}

const NavBar: React.FC<NavBarPros> = ({ currentUser }) => {
  const [searchBar, setSearchBar] = useState<boolean>(false);
  const router = useRouter();
  const path = usePathname();

  const resetSearch = () => {
    router.push("/");
  };

  return (
    <div className="sticky top-0 w-full bg-white z-30 ">
      <div className="py-4 border-b-[1px] border-slate-500">
        <Container>
          <div className="flex items-center justify-between sm:px-2 xl:px-0">
            <Link
              href="/"
              className={`${exo.className} flex items-center opacity-90 font-normal italic text-[1.55rem] sm:text-[1.8rem] hover:scale-105 active:scale-100 transition`}
            >
             <Image src="/logo.png" alt="logo" width={200} height={200} />
            </Link>

            <div className="md:flex gap-5 xl:gap-10 hidden ">
              <Link href="/about" className="text-black">About</Link>
              <Link href="/policies/contact-us" className="text-black">Contact Us</Link>
            </div>

            <div className="flex items-center gap-4 md:gap-8 xl:gap-12">
              {/* <div className="flex items-center gap-4">
                <div
                  className={`hidden md:block opacity-0 transition 
                    ${searchBar ? "opacity-100" : "opacity-0"}
                  `}
                >
                  <SearchBar searchBar={searchBar} />
                </div>
                {searchBar ? (
                  <MdCancel
                    className="text-[1.9rem]  pb-[0.1rem] cursor-pointer hidden md:block hover:scale-110 active:scale-[0.9] transition"
                    onClick={() => {
                      setSearchBar(false);
                      resetSearch();
                    }}
                  />
                ) : (
                  <IoSearchOutline
                    className="text-[1.9rem] pb-[0.1rem] cursor-pointer hidden md:block hover:scale-110 active:scale-[0.9] transition"
                    onClick={() => setSearchBar(true)}
                  />
                )}
              </div> */}

              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
      {/* <Categories /> */}
    </div>
  );
};

export default NavBar;
