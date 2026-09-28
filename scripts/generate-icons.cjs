const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

const sharp = require('sharp');
const pngToIco = require('png-to-ico');

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, 'public');
const SOURCE = path.join(PUBLIC, 'BM.svg');

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const BLACK = { r: 0, g: 0, b: 0, alpha: 1 };
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

// -----------------------------------------------------------------------------
// Configuración
// -----------------------------------------------------------------------------

const CONFIG = {
    favicon: {
        size: 32,
        logoScale: 0.68,
    },

    apple: {
        size: 180,
        logoScale: 0.64,
    },

    icon192: {
        size: 192,
        logoScale: 0.64,
    },

    icon512: {
        size: 512,
        logoScale: 0.64,
    },

    maskable: {
        size: 512,

        // Maskable necesita mucho más espacio alrededor
        // para que la máscara no corte el artwork.
        logoScale: 0.58,
    },
};

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

async function assertSource() {
    try {
        await fs.access(SOURCE);
    } catch {
        throw new Error(`No se encontró ${SOURCE}`);
    }
}

function extractViewBox(svg) {
    const match = svg.match(/viewBox\s*=\s*["']([^"']+)["']/i);

    if (!match) {
        throw new Error('BM.svg necesita un atributo viewBox, por ejemplo viewBox="0 0 512 512".');
    }

    const values = match[1]
        .trim()
        .split(/[\s,]+/)
        .map(Number);

    if (values.length !== 4 || values.some(Number.isNaN)) {
        throw new Error(`viewBox inválido: ${match[1]}`);
    }

    return {
        minX: values[0],
        minY: values[1],
        width: values[2],
        height: values[3],
    };
}

function extractSvgContent(svg) {
    const match = svg.match(/<svg\b[^>]*>([\s\S]*)<\/svg>\s*$/i);

    if (!match) {
        throw new Error('No se pudo interpretar BM.svg.');
    }

    return match[1];
}

/**
 * Calcula el rectángulo donde colocaremos BM.svg
 * dentro de un canvas cuadrado.
 *
 * logoScale:
 *   0.68 => el artwork ocupa aproximadamente 68%
 *   0.58 => aproximadamente 58%
 */
function calculatePlacement(viewBox, canvasSize, logoScale) {
    const sourceRatio = viewBox.width / viewBox.height;

    let width;
    let height;

    if (sourceRatio >= 1) {
        width = canvasSize * logoScale;
        height = width / sourceRatio;
    } else {
        height = canvasSize * logoScale;
        width = height * sourceRatio;
    }

    const x = (canvasSize - width) / 2;
    const y = (canvasSize - height) / 2;

    return {
        x,
        y,
        width,
        height,
    };
}

// -----------------------------------------------------------------------------
// SVG generation
// -----------------------------------------------------------------------------

function createIconSvg({ sourceSvg, background, logoScale, invert = false }) {
    const viewBox = extractViewBox(sourceSvg);
    const content = extractSvgContent(sourceSvg);

    const size = 512;

    const placement = calculatePlacement(viewBox, size, logoScale);

    const filter = invert
        ? `
      <filter id="bm-invert" color-interpolation-filters="sRGB">
        <feColorMatrix
          type="matrix"
          values="
            -1 0 0 0 1
             0 -1 0 0 1
             0 0 -1 0 1
             0 0 0 1 0
          "
        />
      </filter>
    `
        : '';

    const filterAttribute = invert ? 'filter="url(#bm-invert)"' : '';

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="512"
  height="512"
  viewBox="0 0 512 512"
>
  ${filter}

  <rect
    width="512"
    height="512"
    fill="${background}"
  />

  <svg
    x="${placement.x}"
    y="${placement.y}"
    width="${placement.width}"
    height="${placement.height}"
    viewBox="${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}"
    preserveAspectRatio="xMidYMid meet"
    ${filterAttribute}
  >
    ${content}
  </svg>
</svg>
`;
}

// -----------------------------------------------------------------------------
// Raster generation
// -----------------------------------------------------------------------------

async function renderIcon({ sourceSvg, size, logoScale, background, invert = false }) {
    const viewBox = extractViewBox(sourceSvg);

    const placement = calculatePlacement(viewBox, size, logoScale);

    // Primero rasterizamos solamente el BM.
    let logo = sharp(Buffer.from(sourceSvg)).resize({
        width: Math.max(1, Math.round(placement.width)),
        height: Math.max(1, Math.round(placement.height)),
        fit: 'contain',
        background: TRANSPARENT,
    });

    // Para la variante dark:
    // BM negro -> BM blanco.
    if (invert) {
        logo = logo.negate({
            alpha: false,
        });
    }

    const logoBuffer = await logo
        .png({
            compressionLevel: 9,
            adaptiveFiltering: true,
            palette: false,
        })
        .toBuffer();

    // Canvas final con fondo.
    return sharp({
        create: {
            width: size,
            height: size,
            channels: 4,
            background,
        },
    })
        .composite([
            {
                input: logoBuffer,
                left: Math.round(placement.x),
                top: Math.round(placement.y),
            },
        ])
        .png({
            compressionLevel: 9,
            adaptiveFiltering: true,
            palette: false,
        })
        .toBuffer();
}

// -----------------------------------------------------------------------------
// SVG
// -----------------------------------------------------------------------------

async function generateSvgs(sourceSvg) {
    const lightSvg = createIconSvg({
        sourceSvg,
        background: '#ffffff',
        logoScale: 0.68,
    });

    const darkSvg = createIconSvg({
        sourceSvg,
        background: '#000000',
        logoScale: 0.68,
        invert: true,
    });

    await fs.writeFile(path.join(PUBLIC, 'favicon.svg'), lightSvg);

    await fs.writeFile(path.join(PUBLIC, 'favicon-dark.svg'), darkSvg);

    // Para el manifest podemos utilizar la variante normal.
    await fs.writeFile(path.join(PUBLIC, 'icon-vector.svg'), lightSvg);

    console.log('✓ favicon.svg');
    console.log('✓ favicon-dark.svg');
    console.log('✓ icon-vector.svg');
}

// -----------------------------------------------------------------------------
// PNG
// -----------------------------------------------------------------------------

async function generatePngs(sourceSvg) {
    const favicon = await renderIcon({
        sourceSvg,
        size: CONFIG.favicon.size,
        logoScale: CONFIG.favicon.logoScale,
        background: WHITE,
    });

    const apple = await renderIcon({
        sourceSvg,
        size: CONFIG.apple.size,
        logoScale: CONFIG.apple.logoScale,
        background: WHITE,
    });

    const icon192 = await renderIcon({
        sourceSvg,
        size: CONFIG.icon192.size,
        logoScale: CONFIG.icon192.logoScale,
        background: WHITE,
    });

    const icon512 = await renderIcon({
        sourceSvg,
        size: CONFIG.icon512.size,
        logoScale: CONFIG.icon512.logoScale,
        background: WHITE,
    });

    const maskable = await renderIcon({
        sourceSvg,
        size: CONFIG.maskable.size,
        logoScale: CONFIG.maskable.logoScale,
        background: WHITE,
    });

    await fs.writeFile(path.join(PUBLIC, 'apple-touch-icon.png'), apple);

    await fs.writeFile(path.join(PUBLIC, 'icon-192x192.png'), icon192);

    await fs.writeFile(path.join(PUBLIC, 'icon-512x512.png'), icon512);

    await fs.writeFile(path.join(PUBLIC, 'maskable-icon.png'), maskable);

    console.log('✓ apple-touch-icon.png');
    console.log('✓ icon-192x192.png');
    console.log('✓ icon-512x512.png');
    console.log('✓ maskable-icon.png');

    return favicon;
}

// -----------------------------------------------------------------------------
// ICO
// -----------------------------------------------------------------------------

async function generateIco(sourceSvg) {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bm-icons-'));

    const sizes = [16, 24, 32, 48, 64];

    const files = [];

    try {
        for (const size of sizes) {
            const filename = path.join(tempDir, `favicon-${size}.png`);

            const buffer = await renderIcon({
                sourceSvg,
                size,
                logoScale: CONFIG.favicon.logoScale,
                background: WHITE,
            });

            await fs.writeFile(filename, buffer);

            files.push(filename);
        }

        const ico = await pngToIco(files);

        await fs.writeFile(path.join(PUBLIC, 'favicon.ico'), ico);

        console.log('✓ favicon.ico');
    } finally {
        await fs.rm(tempDir, {
            recursive: true,
            force: true,
        });
    }
}

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------

async function main() {
    console.log('\nGenerating BM icons...\n');

    await assertSource();

    const sourceSvg = await fs.readFile(SOURCE, 'utf8');

    const viewBox = extractViewBox(sourceSvg);

    console.log(`Source viewBox: ${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`);

    await generateSvgs(sourceSvg);

    await generatePngs(sourceSvg);

    await generateIco(sourceSvg);

    console.log('\n✓ All icons generated successfully.\n');
}

main().catch((error) => {
    console.error('\n✗ Icon generation failed:\n');
    console.error(error);
    process.exit(1);
});
