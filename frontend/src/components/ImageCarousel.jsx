import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { FcPrevious, FcNext } from 'react-icons/fc'
import { Button, Image } from '@heroui/react'

function ImageCarousel({ srcArray = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {srcArray.map((src, idx) => (
            <div
              className="flex min-w-full flex-shrink-0 items-center justify-center"
              key={idx}
            >
              <Image
                src={src}
                alt={`Slide ${idx}`}
                className="h-64 max-w-[90%] rounded-xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-transparent p-2 text-gray-700 shadow-sm dark:text-white"
      >
        <FcPrevious />
      </Button>
      <Button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-transparent p-2 text-gray-700 shadow-sm dark:text-white"
      >
        <FcNext />
      </Button>
    </div>
  )
}

export default ImageCarousel
