import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const inputFile = path.join(process.cwd(), 'src', 'assets', 'logo.svg');
const outputFile = path.join(process.cwd(), 'src', 'assets', 'logo.png');

async function convertSvgToPng() {
    try {
        await sharp(inputFile)
            .resize(512, 512)
            .png()
            .toFile(outputFile);

        console.log('SVG converted to PNG successfully!');
    } catch (error) {
        console.error('Error converting SVG to PNG:', error);
    }
}

convertSvgToPng(); 