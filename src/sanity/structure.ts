import { ComposeIcon, ImagesIcon } from '@sanity/icons'
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
      S.listItem()
        .title('Services')
        .icon(ComposeIcon)
        .child(S.documentTypeList('service').title('Services')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !['portfolio', 'service'].includes(item.getId() ?? ''),
      ),
    ])
