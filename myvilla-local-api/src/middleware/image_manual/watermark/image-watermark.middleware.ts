import * as sharp from 'sharp';
import * as fs from 'fs';

export async function OverwritingRemarkImages(files: any) {
  if(files && Array.isArray(files)){
    try {
      files.forEach((file) => {
        const inputImagePath = file.path; // The uploaded image path
        addWatermarkToImage(inputImagePath)
      });
    } catch (error) {
      // Handle errors
      throw error;
    }
  }
}

export async function addWatermarkToImage(
  inputImagePath: string
): Promise<void> {
  try {
    const image = sharp(inputImagePath);
    // Calculate the watermark position
    const metadata = await image.metadata();
    const width = metadata.width;
    const height = metadata.height;

    // Read the watermark image
    // const watermarkImage = await addTextOnImage()
    const imageWatermark = sharp('assets/watermark.png').png()
    .resize(width, height)
    .toBuffer((err, buffer, info) => {
        if (err)
            console.log(err);
        if (buffer) {
            return buffer;
        }
    })

    const rawWatermark = await imageWatermark.toBuffer();

    // Composite the watermark onto the image
    await image
      .composite([
        {
          input: rawWatermark,
           gravity: 'center',
        },
      ])
      .toBuffer()
      .then((processedBuffer) => {
        // Save the processed image, overwriting the original
        fs.writeFileSync(inputImagePath, processedBuffer);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } catch (error) {
    throw error;
  }
}


async function addTextOnImage() {
  try {
    const width = 500;
    const height = 500;
    const text = stringToCharacters("Bannayuu Only");

    const svgImage  = `
    <svg width="${width}" height="${height}" >
    <style>
    .title { fill: #FD0404; font-size: 68px; font-weight: bold;}
    </style>
    <text x="25%" y="68%" text-anchor="middle" dominant-baseline="central" transform="rotate(-30, 50, 50)" opacity="0.3" class="title">${text.join('')}</text>
  </svg>
    `;

    const svgBuffer = Buffer.from(svgImage);
    return svgBuffer;
  } catch (error) {
    console.log(error);
  }
}

function stringToCharacters(inputString) {
  const characters = [];

  for (let i = 0; i < inputString.length; i++) {
    characters.push(inputString[i]);
  }

  return characters;
}