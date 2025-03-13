import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = path.join(dirname(__dirname), '..');
const targetDir = dirname(__dirname);

// Crear directorios si no existen
const createDirectoryIfNotExists = async (dir) => {
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
};

// Crear estructura de directorios
await createDirectoryIfNotExists(path.join(targetDir, 'src', 'components'));
await createDirectoryIfNotExists(path.join(targetDir, 'src', 'screens'));
await createDirectoryIfNotExists(path.join(targetDir, 'src', 'utils'));
await createDirectoryIfNotExists(path.join(targetDir, 'src', 'styles'));
await createDirectoryIfNotExists(path.join(targetDir, 'src', 'assets'));

// Función para copiar archivos
const copyFiles = async (source, target) => {
    try {
        await fs.access(source);
    } catch {
        console.error(`Source directory does not exist: ${source}`);
        return;
    }

    const files = await fs.readdir(source);
    for (const file of files) {
        const sourcePath = path.join(source, file);
        const targetPath = path.join(target, file);

        const stats = await fs.stat(sourcePath);
        if (stats.isDirectory()) {
            await createDirectoryIfNotExists(targetPath);
            await copyFiles(sourcePath, targetPath);
        } else {
            await fs.copyFile(sourcePath, targetPath);
            console.log(`Copied: ${sourcePath} -> ${targetPath}`);
        }
    }
};

// Copiar componentes
await copyFiles(
    path.join(sourceDir, 'src', 'components'),
    path.join(targetDir, 'src', 'components')
);

// Copiar pantallas
await copyFiles(
    path.join(sourceDir, 'src', 'screens'),
    path.join(targetDir, 'src', 'screens')
);

// Copiar utilidades
await copyFiles(
    path.join(sourceDir, 'src', 'utils'),
    path.join(targetDir, 'src', 'utils')
);

// Copiar estilos
await copyFiles(
    path.join(sourceDir, 'src', 'styles'),
    path.join(targetDir, 'src', 'styles')
);

// Copiar index.css si existe en la raíz
const sourceIndexCss = path.join(sourceDir, 'src', 'index.css');
const targetStylesDir = path.join(targetDir, 'src', 'styles');
try {
    await fs.access(sourceIndexCss);
    await fs.copyFile(sourceIndexCss, path.join(targetStylesDir, 'index.css'));
    console.log(`Copied: ${sourceIndexCss} -> ${targetStylesDir}/index.css`);
} catch {
    console.log(`Note: ${sourceIndexCss} does not exist, skipping...`);
}

console.log('Files copied successfully!'); 