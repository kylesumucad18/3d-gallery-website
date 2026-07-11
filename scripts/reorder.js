const fs = require('fs')
const path = require('path')

const dir = './public/january'

// Rename 11 and 12 to temp
fs.renameSync(path.join(dir, 'jan (11).JPEG'), path.join(dir, 'temp_1.JPEG'))
fs.renameSync(path.join(dir, 'jan (12).JPEG'), path.join(dir, 'temp_2.JPEG'))

// Shift 1-10 to 3-12 (going backwards to avoid overwriting)
for (let i = 10; i >= 1; i--) {
  const oldName = `jan (${i}).JPEG`
  const newName = `jan (${i + 2}).JPEG`
  fs.renameSync(path.join(dir, oldName), path.join(dir, newName))
}

// Rename temp to 1 and 2
fs.renameSync(path.join(dir, 'temp_1.JPEG'), path.join(dir, 'jan (1).JPEG'))
fs.renameSync(path.join(dir, 'temp_2.JPEG'), path.join(dir, 'jan (2).JPEG'))

console.log('Successfully reordered January photos!')
