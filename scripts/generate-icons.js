import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputFile = path.join(process.cwd(), 'src', 'assets', 'logo.png');
const outputDir = path.join(process.cwd(), 'public', 'icons');

async function generateIcons() {
    try {
        // Asegurarse de que el directorio de salida existe
        await fs.mkdir(outputDir, { recursive: true });

        // Generar iconos para cada tamaño
        for (const size of sizes) {
            await sharp(inputFile)
                .resize(size, size)
                .toFile(path.join(outputDir, `icon-${size}x${size}.png`));

            console.log(`Generated icon-${size}x${size}.png`);
        }

        // Generar icono maskable
        await sharp(inputFile)
            .resize(512, 512)
            .toFile(path.join(outputDir, 'maskable-icon.png'));

        console.log('Generated maskable icon');

        console.log('All icons generated successfully!');
    } catch (error) {
        console.error('Error generating icons:', error);
    }
}

generateIcons(); 