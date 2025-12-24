// GROQ queries pour récupérer les données depuis Sanity

// Portfolio/Projets
export const projectsQuery = `*[_type == "project" && published == true] | order(order asc) {
  _id,
  title,
  slug,
  description,
  mainImage {
    ...,
    asset-> {
      _id,
      url,
      metadata {
        lqip,
        dimensions
      }
    }
  },
  gallery[] {
    ...,
    asset-> {
      _id,
      url,
      metadata {
        lqip,
        dimensions
      }
    }
  },
  tags,
  projectUrl,
  order
}`

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  mainImage,
  gallery,
  tags,
  projectUrl
}`

// Services et Offres
export const servicesQuery = `*[_type == "service" && published == true] | order(order asc) {
  _id,
  title,
  subtitle,
  price,
  description,
  features,
  isRecommended,
  color,
  order
}`

// FAQ
export const faqsQuery = `*[_type == "faq" && published == true] | order(order asc) {
  _id,
  question,
  answer,
  color,
  order
}`

// Équipe
export const teamMembersQuery = `*[_type == "teamMember" && published == true] | order(order asc) {
  _id,
  name,
  role,
  bio,
  image,
  skills,
  social,
  order
}`

// Timeline/Parcours
export const timelineQuery = `*[_type == "timeline" && published == true] | order(order asc) {
  _id,
  title,
  organization,
  period,
  description,
  type,
  order
}`

// Pages légales
export const legalPagesQuery = `*[_type == "legalPage" && published == true] {
  _id,
  title,
  slug,
  content,
  lastUpdated
}`

export const legalPageBySlugQuery = `*[_type == "legalPage" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  content,
  lastUpdated
}`
