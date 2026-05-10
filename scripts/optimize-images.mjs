import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, '../public/images');
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function optimizeImages(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await optimizeImages(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const webpPath = fullPath.replace(ext, '.webp');
        
        try {
          const image = sharp(fullPath);
          const metadata = await image.metadata();

          let pipeline = image;
          if (metadata.width > MAX_WIDTH) {
            pipeline = pipeline.resize(MAX_WIDTH);
          }

          // Generate WebP
          await pipeline
            .webp({ quality: QUALITY })
            .toFile(webpPath);

          // Optimize original in place (optional but recommended)
          const tempPath = fullPath + '.tmp';
          if (ext === '.png') {
            await pipeline.png({ quality: QUALITY, compressionLevel: 9 }).toFile(tempPath);
          } else {
            await pipeline.jpeg({ quality: QUALITY, progressive: true }).toFile(tempPath);
          }
          
          fs.renameSync(tempPath, fullPath);

          console.log(`✅ Optimized: ${file} -> WebP & compressed original`);
        } catch (err) {
          console.error(`❌ Error processing ${file}:`, err.message);
        }
      }
    }
  }
}

console.log('🚀 Starting image optimization...');
optimizeImages(INPUT_DIR).then(() => {
  console.log('✨ All images optimized!');
});
