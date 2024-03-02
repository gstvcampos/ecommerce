'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

export const CarouselGalleryWidget = ({
  imageUrls,
}: {
  imageUrls: string[]
}) => {
  const [grabbing, setGrabbing] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [moving, setMoving] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const allItemsRefs = {}

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setGrabbing(true)
    setStartX(e.pageX - e.currentTarget.offsetLeft)
    setScrollLeft(e.currentTarget.scrollLeft)
  }

  const handleMouseLeave = () => {
    setGrabbing(false)
  }

  const handleMouseUp = () => {
    setGrabbing(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!grabbing) return
    e.preventDefault()
    const x = e.pageX - e.currentTarget.offsetLeft
    const walk = (x - startX) * 3
    e.currentTarget.scrollLeft = scrollLeft - walk
  }

  const handleNext = () => {
    if (moving) return
    setMoving(true)
    const carousel = carouselRef.current
    if (carousel) {
      carousel.scrollLeft += carousel.offsetWidth
    }
    setTimeout(() => setMoving(false), 600)
  }

  const handlePrev = () => {
    if (moving) return
    setMoving(true)
    const carousel = carouselRef.current
    if (carousel) {
      carousel.scrollLeft -= carousel.offsetWidth
    }
    setTimeout(() => setMoving(false), 600)
  }

  const handleThumbnailClick = (i) => {
    if (moving) return
    setMoving(true)
    const carousel = carouselRef.current
    const item = allItemsRefs[i]
    if (carousel && item) {
      const carouselRect = carousel.getBoundingClientRect()
      const itemRect = item.getBoundingClientRect()

      const scrollLeft = itemRect.left - carouselRect.left + carousel.scrollLeft

      carousel.scrollLeft = scrollLeft
    }
    setTimeout(() => setMoving(false), 600)
  }

  return (
    <div className="flex flex-col gap-4 md:w-3/5 md:pr-10">
      <div
        className="carousel cursor-grab max-w-full"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={carouselRef}
      >
        {imageUrls.map((url, i) => (
          <div
            key={i}
            className="carousel-item w-full h-full relative aspect-square"
            ref={(ref) => (allItemsRefs[i] = ref)}
          >
            <Image src={url} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="flex">
        <button className="px-2" onClick={handlePrev}>
          ❮
        </button>
        <div className="flex w-full overflow-x-auto no-scrollbar relative">
          {imageUrls.map((img, i) => (
            <div key={i} className="p-2 min-w-20">
              <Image
                src={img}
                height={80}
                width={80}
                alt="imagem produto"
                className="object-cover cursor-pointer"
                onClick={() => handleThumbnailClick(i)}
              />
            </div>
          ))}
        </div>
        <button className="px-2" onClick={handleNext}>
          ❯
        </button>
      </div>
    </div>
  )
}
