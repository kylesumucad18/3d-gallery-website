import fs from 'fs'
import path from 'path'
import { RecentGallery } from './recent-gallery'

export const dynamic = 'force-dynamic'

export default function RecentPicturesPage() {
  const rpDir = path.join(process.cwd(), 'public', 'rp')
  let files: string[] = []
  
  try {
    if (fs.existsSync(rpDir)) {
      files = fs.readdirSync(rpDir).filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
    }
  } catch (e) {
    console.error('Error reading /rp directory:', e)
  }

  // Generate varied aspect ratios for masonry layout
  const aspectRatios = ['aspect-[3/4]', 'aspect-[4/3]', 'aspect-square', 'aspect-[3/5]', 'aspect-[16/9]']

  const photos = files.map((file, index) => {
    // Determine a pseudo-random aspect ratio based on index for consistent rendering
    const aspect = aspectRatios[index % aspectRatios.length]
    return {
      id: index + 1,
      src: `/rp/${file}`,
      aspect
    }
  })

  return <RecentGallery photos={photos} />
}
