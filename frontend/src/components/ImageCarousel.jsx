import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FcPrevious, FcNext } from 'react-icons/fc';
import { Button, Image } from '@heroui/react';

function ImageCarousel({ srcArray = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {srcArray.map((src, idx) => (
            <div
              className="flex min-w-full shrink-0 items-center justify-center"
              key={idx}
            >
              <Image
                src={src}
                alt={`Slide ${idx}`}
                className="h-72 w-full rounded-xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={scrollPrev}
        className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full border border-white/40 bg-black/25 p-2 text-white shadow-sm backdrop-blur-sm"
      >
        <FcPrevious />
      </Button>
      <Button
        onClick={scrollNext}
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full border border-white/40 bg-black/25 p-2 text-white shadow-sm backdrop-blur-sm"
      >
        <FcNext />
      </Button>
    </div>
  );
}

export default ImageCarousel;
