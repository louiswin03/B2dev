const path = require('path');
const sharp = require('sharp');

const src = path.join(__dirname, '..', 'public', 'images', 'B2dev_google.jpg');
const outIcon = path.join(__dirname, '..', 'app', 'icon.png');
const outApple = path.join(__dirname, '..', 'app', 'apple-icon.png');

async function makeCircle(target, size) {
  const input = sharp(src);
  const { data } = await input.trim().toBuffer({ resolveWithObject: true });
  const squareSize = size;
  const img = sharp(data).resize({
    width: squareSize,
    height: squareSize,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  const maskSvg = `<svg width="${squareSize}" height="${squareSize}" xmlns="http://www.w3.org/2000/svg"><circle cx="${squareSize / 2}" cy="${squareSize / 2}" r="${squareSize / 2}" fill="white"/></svg>`;
  const mask = Buffer.from(maskSvg);
  await img.composite([{ input: mask, blend: 'dest-in' }]).png().toFile(target);
}

(async () => {
  await makeCircle(outIcon, 512);
  await makeCircle(outApple, 180);
  console.log('Generated icon.png and apple-icon.png from B2dev_google.jpg');
})();
