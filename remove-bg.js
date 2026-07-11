const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

const doodlesDir = path.join(__dirname, 'public', 'doodles');
const files = fs.readdirSync(doodlesDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

async function processImages() {
  for (const file of files) {
    const filePath = path.join(doodlesDir, file);
    console.log('Processing', file);
    try {
      const image = await Jimp.read(filePath);
      // Remove fake checkerboard: both light (white/grey) and dark (black/dark-grey).
      image.scan((x, y, idx) => {
        const r = image.bitmap.data[idx + 0];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];
        const a = image.bitmap.data[idx + 3];
        
        if (a === 0) return; // already transparent
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;
        
        // Remove light checkerboard (max > 150) or dark checkerboard (max < 80)
        // Only if it's very unsaturated (diff < 20)
        if ((max > 150 || max < 80) && diff < 20) {
          image.bitmap.data[idx + 3] = 0; // make transparent
        }
      });
      await image.write(filePath);
      console.log('Saved', file);
    } catch (e) {
      console.error('Error processing', file, e);
    }
  }
}

processImages();
