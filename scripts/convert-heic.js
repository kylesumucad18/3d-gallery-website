const fs = require('fs')
const { promisify } = require('util')
const heicConvert = require('heic-convert')

const dir = './public/january'

async function convertAll() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.HEIC'))
  for (const file of files) {
    console.log(`Converting ${file}...`)
    const inputBuffer = fs.readFileSync(`${dir}/${file}`)
    try {
      const outputBuffer = await heicConvert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 0.9
      })
      const outName = file.replace('.HEIC', '.JPEG')
      fs.writeFileSync(`${dir}/${outName}`, outputBuffer)
      console.log(`Successfully converted to ${outName}`)
      
      // Optionally delete original
      fs.unlinkSync(`${dir}/${file}`)
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err)
    }
  }
}

convertAll()
