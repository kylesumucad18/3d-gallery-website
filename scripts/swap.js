const fs = require('fs')
const path = require('path')

const dir = './public/january'

fs.renameSync(path.join(dir, 'jan (3).JPEG'), path.join(dir, 'temp.JPEG'))
fs.renameSync(path.join(dir, 'jan (5).JPEG'), path.join(dir, 'jan (3).JPEG'))
fs.renameSync(path.join(dir, 'temp.JPEG'), path.join(dir, 'jan (5).JPEG'))

console.log('Swapped 3 and 5 successfully!')
