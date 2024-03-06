'use client'

import { Product } from '@prisma/client'
import { useRef, useState } from 'react'
import ProductCard from '../ProductCard'
import { NextIcon } from '../icons/NextIcon'
import { PrevIcon } from '../icons/PrevIcon'

export default function CarouselProducts({
  products,
  title,
}: {
  products: Product[]
  title: string
}) {
  const [grabbing, setGrabbing] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [moving, setMoving] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="relative px-2 py-6">
      <div className="flex items-center p-4">
        <div className="flex-grow border-b-[1px]"></div>
        <span className="px-2 font-bold text-2xl uppercase">{title}</span>
        <div className="flex-grow border-b-[1px]"></div>
      </div>
      <div
        className="carousel cursor-grab gap-4 max-w-full"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={carouselRef}
      >
        {products.map((product) => (
          <div
            className="w-1/2 sm:w-1/3 md:w-1/4 flex-grow shrink-0 py-2"
            key={product.id}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div className="hidden md:block">
        <button
          className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-lg"
          onClick={handlePrev}
        >
          <PrevIcon />
        </button>
        <button
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-lg"
          onClick={handleNext}
        >
          <NextIcon />
        </button>
      </div>
    </div>
  )
}
