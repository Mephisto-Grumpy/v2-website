'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'

const images = [
  'https://www.pungrumpy.com/screenshot/preview.png',
  'https://www.pungrumpy.com/screenshot/preview-iphone.png',
  'https://www.pungrumpy.com/screenshot/preview-2.png',
  'https://www.pungrumpy.com/screenshot/preview-iphone-2.png'
]

export const NewWorkOverlay = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <main className="group fixed bottom-6 right-10 z-30 overflow-hidden">
      <Link
        href="https://www.pungrumpy.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block size-40 overflow-hidden rounded-lg border border-border bg-background shadow-lg transition-all duration-300"
      >
        <div className="relative size-full">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={currentImageIndex}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{
                duration: 1,
                ease: 'easeInOut'
              }}
              className="absolute size-full"
            >
              <Image
                src={images[currentImageIndex]}
                alt={`Portfolio screenshot ${currentImageIndex + 1}`}
                fill
                sizes="160px"
                className={cn(
                  'size-full object-cover',
                  'transform transition-transform duration-300 group-hover:scale-105'
                )}
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-background/30 p-2 backdrop-blur-sm">
            <p className="text-center text-xs font-bold text-foreground">
              NEW FREE PORTFOLIO
            </p>
          </div>
        </div>
      </Link>
    </main>
  )
}
