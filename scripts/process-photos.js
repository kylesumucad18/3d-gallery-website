const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const heicConvert = require('heic-convert')

const publicDir = path.join(__dirname, '../public')
const months = ['january', 'february', 'march', 'april', 'may', 'june']

async function processPhotos() {
  const photosMap = {}

  for (const month of months) {
    console.log(`Processing ${month}...`)
    const monthDir = path.join(publicDir, month)
    if (!fs.existsSync(monthDir)) {
      console.log(`Skipping ${month}, folder not found.`)
      continue
    }

    const monthKey = month.charAt(0).toUpperCase() + month.slice(1)
    photosMap[monthKey] = []

    // 1. Delete placeholders
    for (let i = 1; i <= 10; i++) {
      const placeholderPath = path.join(monthDir, `${i}.png`)
      if (fs.existsSync(placeholderPath)) {
        fs.unlinkSync(placeholderPath)
        console.log(`  Deleted placeholder ${i}.png`)
      }
    }

    // 2. Read remaining files and convert HEIC
    let files = fs.readdirSync(monthDir)
    for (const file of files) {
      if (file.toLowerCase().endsWith('.heic')) {
        console.log(`  Converting ${file} to JPEG...`)
        const inputBuffer = fs.readFileSync(path.join(monthDir, file))
        try {
          const outputBuffer = await heicConvert({
            buffer: inputBuffer,
            format: 'JPEG',
            quality: 0.9
          })
          const outName = file.replace(/\.heic$/i, '.JPEG')
          fs.writeFileSync(path.join(monthDir, outName), outputBuffer)
          fs.unlinkSync(path.join(monthDir, file))
          console.log(`  Successfully converted to ${outName}`)
        } catch (err) {
          console.error(`  Failed to convert ${file}:`, err)
        }
      }
    }

    // 3. Re-read directory for final list of valid images
    files = fs.readdirSync(monthDir)
    const validExts = ['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif']
    
    // Sort files to keep order consistent
    files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))

    files.forEach((file, index) => {
      const ext = path.extname(file).toLowerCase()
      if (validExts.includes(ext)) {
        photosMap[monthKey].push({
          id: index + 1,
          title: `${monthKey} Photo ${index + 1}`,
          src: `/${month}/${file}`
        })
      }
    })
    
    console.log(`  Found ${photosMap[monthKey].length} valid photos for ${monthKey}.`)
  }

  // Write manifest
  fs.writeFileSync(
    path.join(publicDir, 'photos.json'),
    JSON.stringify(photosMap, null, 2)
  )
  console.log('Successfully generated public/photos.json!')
}

processPhotos()
