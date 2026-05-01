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

export const ALL_PORTFOLIO_QUERY = defineQuery(`
  *[_type == "portfolio" && defined(slug.current)]
  | order(coalesce(year, 0) desc, coalesce(order, 9999) asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    coverImagePath,
    tags,
    summary,
    client,
    year,
    externalUrl
  }
`)

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service" && featured == true]
  | order(coalesce(order, 9999) asc, _createdAt asc) {
    _id,
    title,
    tagline,
    body,
    deliverables,
    image,
    imagePath,
    objectPosition
  }
`)
