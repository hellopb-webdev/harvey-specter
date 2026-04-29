/**
 * One-off seed: upload /public/images/project-N.png as Sanity image assets,
 * then patch the matching portfolio documents to set coverImage and clear coverImagePath.
 *
 * Run with:
 *   npx sanity exec scripts/upload-portfolio-images.ts --with-user-token
 */
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { getCliClient } from 'sanity/cli'

type Mapping = { slug: string; file: string; alt: string }

const MAPPINGS: Mapping[] = [
  { slug: 'surfers-paradise', file: 'project-1.png', alt: 'Surfers Paradise cover image' },
  { slug: 'cyberpunk-caffe', file: 'project-2.png', alt: 'Cyberpunk Caffe cover image' },
  { slug: 'agency-976', file: 'project-3.png', alt: 'Agency 976 cover image' },
  { slug: 'minimal-playground', file: 'project-4.png', alt: 'Minimal Playground cover image' },
]

async function main() {
  const client = getCliClient({ apiVersion: '2026-04-29' })

  for (const { slug, file, alt } of MAPPINGS) {
    const filePath = resolve(process.cwd(), 'public', 'images', file)
    const buffer = await readFile(filePath)

    console.log(`Uploading ${file}...`)
    const asset = await client.assets.upload('image', buffer, {
      filename: file,
      contentType: 'image/png',
    })

    const docId = await client
      .fetch<string | null>(
        '*[_type == "portfolio" && slug.current == $slug][0]._id',
        { slug },
      )
    if (!docId) {
      console.warn(`No portfolio doc found for slug "${slug}", skipping.`)
      continue
    }

    console.log(`Patching ${docId} → coverImage=${asset._id}`)
    await client
      .patch(docId)
      .set({
        coverImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
          alt,
        },
      })
      .unset(['coverImagePath'])
      .commit()
  }

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
