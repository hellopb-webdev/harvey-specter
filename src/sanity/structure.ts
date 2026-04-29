import { ImagesIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Portfolio')
        .icon(ImagesIcon)
        .child(S.documentTypeList('portfolio').title('Portfolio')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'portfolio',
      ),
    ])
