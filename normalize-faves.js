const fs = require('fs');
const path = require('path');
const heicConvert = require('heic-convert');

const favmomentsDir = path.join(__dirname, 'public', 'favmoments');

async function processDir(dirName) {
  const dirPath = path.join(favmomentsDir, dirName);
  if (!fs.existsSync(dirPath)) return;

  const files = fs.readdirSync(dirPath);
  let count = 1;

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const ext = path.extname(file).toLowerCase();
    const newFilePath = path.join(dirPath, `${count}.jpg`);

    if (ext === '.heic') {
      console.log(`Converting ${file} in ${dirName}...`);
      const inputBuffer = fs.readFileSync(filePath);
      try {
        const outputBuffer = await heicConvert({
          buffer: inputBuffer,
          format: 'JPEG',
          quality: 0.9
        });
        fs.writeFileSync(newFilePath, Buffer.from(outputBuffer));
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    } else if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      // Just rename to sequential name
      if (filePath !== newFilePath) {
        console.log(`Renaming ${file} to ${count}.jpg in ${dirName}...`);
        // if renaming to jpg from png, it's not a real jpg but browser can handle it.
        // For actual conversion, we'd need another library. Let's just rename to keep it simple.
        fs.renameSync(filePath, newFilePath);
      }
    }
    count++;
  }
}

async function main() {
  await processDir('fave1');
  await processDir('fave2');
  await processDir('fave3');
  console.log('Done normalizing faves!');
}

main();
