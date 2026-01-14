'use client'

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Info } from "lucide-react"
import { TapRainModal } from "@/components/taprain-modal"

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    const startValue = 0

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart)
      
      setCount(currentCount)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration])

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  return <span>{formatNumber(count)}</span>
}

export function Hero() {
  return (
    <section className="relative bg-surface-dark text-surface-dark-foreground pt-24 pb-10 sm:pt-28 sm:pb-12 md:pt-32 md:pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
      <TapRainModal />
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <div className="flex justify-start">
          <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 max-w-6xl text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-semibold leading-[1.1] sm:leading-tight tracking-tight">
              <div className="block">Stop scrolling for free.</div>
              <div className="block mt-1 sm:mt-1.5 md:mt-2"><span style={{ color: '#fd2d55' }}>Start earning now.</span></div>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              The most awaited <span style={{ color: '#fd2d55' }}>Beta</span> is here. Start earning automatically from your regular watch activity and enjoy your feed like never before.
            </p>

            <p className="text-xs sm:text-base md:text-xl lg:text-2xl text-muted-foreground leading-tight sm:leading-relaxed flex items-center gap-1.5 sm:gap-2 -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-5" style={{ fontFamily: 'var(--font-tiktok-sans)' }}>
              <Info className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 flex-shrink-0" />
              <span className="whitespace-nowrap">This feature is currently limited to invited beta members only.</span>
            </p>

            <div className="flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-8 pt-1 justify-start">
              <Button 
                onClick={() => {
                  if (typeof window !== 'undefined' && window.showTapRainOffers) {
                    window.showTapRainOffers()
                  }
                }}
                className="text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl min-h-[52px] sm:min-h-[56px] md:h-16 lg:h-20 px-8 sm:px-10 md:px-12 lg:px-14 rounded-full w-full sm:w-auto active:opacity-90 hover:scale-105 hover:brightness-110 transition-all duration-300 touch-manipulation"
                style={{ backgroundColor: '#fd2d55' }}
              >
                Apply Now
              </Button>
              <div className="text-base sm:text-lg md:text-xl text-center" style={{ color: '#cfe6e5' }}>
                <div className="block"><span className="font-bold"><CountUp end={100000} /></span>+ accounts got approved today!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
