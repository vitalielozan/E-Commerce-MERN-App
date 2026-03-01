import { Image } from '@heroui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      style={{ backgroundImage: `url('/shopping_store.jpg')` }}
      className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-cover bg-center bg-no-repeat shadow-xl shadow-slate-900/10 md:h-[70vh] dark:border-slate-700"
    >
      <div className="absolute inset-0 bg-slate-950/55 dark:bg-slate-950/70" />
      <div className="relative z-10 mx-auto my-10 max-w-3xl space-y-5 rounded-2xl border border-white/20 bg-black/25 px-6 py-8 text-center text-slate-100 backdrop-blur-sm md:my-16 md:px-10 md:py-10">
        <h1 className="text-4xl leading-tight font-bold tracking-tight text-white md:text-5xl">
          {t('hero.title')}
        </h1>
        <p className="text-lg text-slate-100 md:text-xl">
          {t('hero.subtitle')}
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
