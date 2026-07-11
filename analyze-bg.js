const { Jimp } = require('jimp');
const path = require('path');

async function analyze() {
  const filePath = path.join(__dirname, 'public', 'doodles', 'hearts.png');
  const image = await Jimp.read(filePath);
  
  const colors = new Set();
  
  // scan first 20x20 pixels
  for(let y=0; y<20; y++) {
    for(let x=0; x<20; x++) {
      const idx = (y * image.bitmap.width + x) * 4;
      const r = image.bitmap.data[idx];
      const g = image.bitmap.data[idx+1];
      const b = image.bitmap.data[idx+2];
      const a = image.bitmap.data[idx+3];
      colors.add(`${r},${g},${b},${a}`);
    }
  }
  
  console.log("Colors in top-left 20x20 of hearts.png:");
  console.log(Array.from(colors).join('\n'));
}

analyze();
