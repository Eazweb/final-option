import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-zinc-800">
      <div className="px-4 max-w-[1400px] mx-auto pt-16 w-full md:px-24 lg:px-8">
        <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <a
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <h1 className="text-white font-semibold text-4xl">Medimetics</h1>
            </a>
            <div className="mt-6 lg:max-w-sm">
              <p className="text-sm text-gray-300">
                At Medimetics, we specialize in skin care products that enhance
                your face's glow and fix minor skin problems. Our products are
                crafted with love, comfort, and hygiene, keeping your pretty
                face clean and glowing
              </p>
              <p className="mt-4 text-sm text-gray-300">
                Whether you're a seasoned lifter or just starting out, trust
                Medimetics for quality products that stands the test of time
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-base font-bold tracking-wide text-gray-100">
              Contacts
            </p>
            <div className="flex">
              <p className="mr-1 text-gray-300">Phone:</p>
              <a
                href="tel:+919056506403"
                aria-label="Our phone"
                title="Our phone"
                className="transition-colors duration-300 text-gray-300 hover:text-gray-400"
              >
                +91 91155 57179
              </a>
            </div>
            <div className="flex">
              <p className="mr-1 text-gray-300">Email:</p>
              <a
                href="mailto:medimetics6@gmail.com"
                aria-label="Our email"
                title="Our email"
                className="transition-colors duration-300  text-gray-300 hover:text-gray-400"
              >
                medimetics6@gmail.com
              </a>
            </div>
            <div>
              <span className="text-base font-bold tracking-wide text-gray-100">
                Social
              </span>
              <div className="flex items-center mt-3 space-x-3">
                <a
                  href="https://wa.me/+919115557179"
                  target="_blank"
                  className="text-gray-400 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/realmedimetics?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  className="text-gray-400 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Instagram
                </a>
                <a
                  href="/faq"
                  className="text-md font-semibold text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  F.A.Q
                </a>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm text-white block">
            <div className="text-base font-bold tracking-wide text-gray-100">
              Policies
            </div>
            <div>
              <Link href="/policies/privacy">Privacy</Link>
            </div>
            <div>
              <Link href="/policies/contact-us">Contact Us</Link>
            </div>
            <div>
              <Link href="/policies/terms-and-conditions">
                Terms and Conditions
              </Link>
            </div>
            <div>
              <Link href="/policies/refund-and-cancellations">
                Refund and Cancellations
              </Link>
            </div>
            <div>
              <Link href="/policies/product-shipping-policy">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
          <p className="text-sm text-gray-300">
            © Copyright 2025 Medimetics Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
