import { cn } from '@/lib/ultis'
import { ReactNode } from 'react'

export default function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-6', className)}
    >
      {children}
    </div>
  )
}
