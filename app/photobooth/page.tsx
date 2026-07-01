import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photobooth - Rica Marie',
}

import PhotoboothContent from '@/components/photobooth-content'

export default function PhotoboothPage() {
  return <PhotoboothContent />
}
