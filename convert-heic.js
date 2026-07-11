const fs = require('fs');
const path = require('path');
const heicConvert = require('heic-convert');

const targetDir = path.join(__dirname, 'public', 'favmoments');

async function convertHeic() {
  const files = fs.readdirSync(targetDir);
  let convertedCount = 0;
  for (const file of files) {
    if (file.toLowerCase().endsWith('.heic')) {
      console.log(`Converting ${file}...`);
      const inputBuffer = fs.readFileSync(path.join(targetDir, file));
      try {
        const outputBuffer = await heicConvert({
          buffer: inputBuffer,
          format: 'JPEG',
          quality: 0.9
        });
        
        // Output them as sequentially named JPGs (1.jpg, 2.jpg, 3.jpg)
        convertedCount++;
        const newFileName = `${convertedCount}.jpg`;
        fs.writeFileSync(path.join(targetDir, newFileName), Buffer.from(outputBuffer));
        
        console.log(`Successfully converted to ${newFileName}. Deleting original...`);
        fs.unlinkSync(path.join(targetDir, file));
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
  console.log(`Conversion complete! Converted ${convertedCount} files.`);
}

convertHeic();
