'use client'

import { useRouter } from 'next/navigation'
import { PhotoCarouselModal } from '@/components/photo-carousel-modal'
import { use, useEffect } from 'react'

export default function MonthCarouselPage({ params }: { params: Promise<{ month: string }> }) {
  const { month } = use(params)
  const router = useRouter()

  // Validate the month parameter
  const validMonths = ['january', 'february', 'march', 'april', 'may', 'june']
  const monthIndex = validMonths.indexOf(month.toLowerCase())
  const isValid = monthIndex !== -1

  useEffect(() => {
    if (!isValid) {
      router.replace('/')
    }
  }, [isValid, router])

  if (!isValid) return null

  const prevMonth = monthIndex > 0 ? validMonths[monthIndex - 1] : null
  const nextMonth = monthIndex < validMonths.length - 1 ? validMonths[monthIndex + 1] : null

  const prevMonthName = prevMonth ? prevMonth.charAt(0).toUpperCase() + prevMonth.slice(1) : null
  const nextMonthName = nextMonth ? nextMonth.charAt(0).toUpperCase() + nextMonth.slice(1) : null

  const monthName = month.charAt(0).toUpperCase() + month.slice(1)

  // Generate the 10 photos for the carousel
  const photos = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    title: `${month.charAt(0).toUpperCase() + month.slice(1)} Photo ${i + 1}`,
    src: `/${month.toLowerCase()}/${i + 1}.png`
  }))

  return (
    <div className="min-h-screen bg-background">
      <PhotoCarouselModal
        isOpen={true}
        onClose={() => router.push('/#history')}
        title={`${monthName} Memories`}
        photos={photos}
        monthName={monthName}
        prevMonthPath={prevMonth ? `/${prevMonth}` : null}
        nextMonthPath={nextMonth ? `/${nextMonth}` : null}
        prevMonthName={prevMonthName}
        nextMonthName={nextMonthName}
      />
    </div>
  )
}
