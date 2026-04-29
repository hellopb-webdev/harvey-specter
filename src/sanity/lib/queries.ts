import { defineQuery } from 'next-sanity'

export const FEATURED_PORTFOLIO_QUERY = defineQuery(`
  *[_type == "portfolio" && featured == true && defined(slug.current)]
  | order(coalesce(order, 9999) asc, _createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    coverImagePath,
    tags,
    displaySize,
    summary,
    client,
    year,
    externalUrl
  }
`)
