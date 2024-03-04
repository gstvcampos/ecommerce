'use client'

import { cn } from '@/lib/ultis'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Banner({ slides }: { slides: string[] }) {
  const [curr, setCurr] = useState(0)

  const next = () => setCurr((curr + 1) % slides.length)
  const prev = () => setCurr(curr - 1 < 0 ? slides.length - 1 : curr - 1)

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [curr])

  return (
    <div>
      <div className="relative h-[220px] md:h-[340px] w-full">
        <Image src={slides[curr]} fill alt="banner" className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-between">
          <button onClick={prev} className="text-primary-content p-4">
            ❮
          </button>
          <button onClick={next} className="text-primary-content p-4">
            ❯
          </button>
        </div>
      </div>
      <div className="mx-auto flex justify-center py-2 gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-4 h-1 cursor-pointer transition-all bg-primary/20',
              curr === i && 'w-8 bg-primary',
            )}
            onClick={() => setCurr(i)}
          ></div>
        ))}
      </div>
    </div>
  )
}
