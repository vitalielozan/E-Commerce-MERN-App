import { Image } from '@heroui/react';
import React from 'react';

function HeroSection() {
  return (
    <section
      style={{ backgroundImage: `url('/shopping_store.jpg')` }}
      className="relative flex h-[70vh] items-center justify-center bg-cover bg-center bg-no-repeat md:h-[80vh]"
    >
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      <div className="relative z-10 max-w-3xl space-y-6 px-6 text-center text-gray-100">
        <h1 className="text-5xl leading-tight font-bold text-gray-100 md:text-5xl">
          Discover Top Brands & Exclusive Deals
        </h1>
        <p className="text-xl text-gray-100">
          Shop smarter with curated collections from premium brands all in one
          place.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
