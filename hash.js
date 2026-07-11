const crypto = require('crypto');

function hash(str) {
  return crypto.createHash('sha256').update(str.toLowerCase().trim()).digest('hex');
}

console.log("portfolio:", ['9', 'nine'].map(hash));
console.log("birthday:", ['laplap', 'lap2'].map(hash));
console.log("about:", ['Cooper', 'kuku', 'cooperlaling'].map(hash));
