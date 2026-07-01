'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { PhotoboothLayout } from '@/components/photobooth-layout'

function PhotoboothInner() {
  const searchParams = useSearchParams()
  const layout = (searchParams.get('layout') || 'M') as 'M' | 'A' | 'R' | 'I' | 'E' | 'H'
  const theme = (searchParams.get('theme') || 'minimalistic') as 'minimalistic' | 'coquette'

  return (
    <main className="bg-background min-h-screen">
      <PhotoboothLayout layout={layout} theme={theme} />
    </main>
  )
}

export default function PhotoboothContent() {
  return (
    <Suspense fallback={<div className="bg-background min-h-screen" />}>
      <PhotoboothInner />
    </Suspense>
  )
}
