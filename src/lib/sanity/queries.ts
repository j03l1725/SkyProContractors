/**
 * Sanity GROQ Queries
 * Type-safe queries for fetching project data
 */

import { SanityProject } from '@/sanity/schemas/project';
import { sanityFetch } from '@/sanity/lib/client';

/**
 * Query: Get Featured Projects
 * Fetches the latest 3 featured projects
 */
const FEATURED_PROJECTS_QUERY = `*[_type == "project" && featured == true] | order(_createdAt desc) [0...3] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  mainImage,
  categories[]-> {
    _id,
    title
  },
  completionDate,
  location,
  description
}`;

export async function getFeaturedProjects(): Promise<SanityProject[]> {
  const projects = await sanityFetch<SanityProject[]>({
    query: FEATURED_PROJECTS_QUERY,
    tags: ['project', 'featured'],
  });

  return projects || [];
}

/**
 * Query: Get All Projects
 * Fetches all projects ordered by creation date
 */
const ALL_PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  mainImage,
  categories[]-> {
    _id,
    title
  },
  completionDate,
  location
}`;

export async function getAllProjects(): Promise<SanityProject[]> {
  const projects = await sanityFetch<SanityProject[]>({
    query: ALL_PROJECTS_QUERY,
    tags: ['project'],
  });

  return projects || [];
}

/**
 * Query: Get Project by Slug
 */
const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  mainImage,
  gallery,
  "categories": categories[]{
    "_id": @,
    "title": select(
      @ == "roofing" => "Roofing",
      @ == "siding" => "Siding",
      @ == "windows" => "Windows",
      @ == "insurance" => "Insurance Claims",
      @ == "residential" => "Residential",
      @ == "commercial" => "Commercial",
      upper(@)
    )
  },
  completionDate,
  location,
  description
}`;

export async function getProjectBySlug(
  slug: string
): Promise<SanityProject | null> {
  return await sanityFetch<SanityProject>({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug },
    tags: ['project', slug],
  });
}
