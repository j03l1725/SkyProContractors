/**
 * Sanity Project Document Schema
 * Defines the structure for construction projects
 */

import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface SanityProject {
    _id: string;
    _type: 'project';
    _createdAt: string;
    _updatedAt: string;
    title: string;
    slug: {
        current: string;
    };
    mainImage: SanityImageSource;
    categories?: Array<{
        _id: string;
        title: string;
    }>;
    completionDate?: string;
    location?: string;
    description?: string;
    featured?: boolean;
}

/**
 * Example Sanity Studio Schema (for reference)
 * Place this in your Sanity Studio project at schemas/project.ts
 * 
 * export default {
 *   name: 'project',
 *   title: 'Project',
 *   type: 'document',
 *   fields: [
 *     {
 *       name: 'title',
 *       title: 'Title',
 *       type: 'string',
 *       validation: (Rule) => Rule.required(),
 *     },
 *     {
 *       name: 'slug',
 *       title: 'Slug',
 *       type: 'slug',
 *       options: {
 *         source: 'title',
 *         maxLength: 96,
 *       },
 *       validation: (Rule) => Rule.required(),
 *     },
 *     {
 *       name: 'mainImage',
 *       title: 'Main Image',
 *       type: 'image',
 *       options: {
 *         hotspot: true,
 *       },
 *     },
 *     {
 *       name: 'categories',
 *       title: 'Categories',
 *       type: 'array',
 *       of: [{ type: 'reference', to: [{ type: 'category' }] }],
 *     },
 *     {
 *       name: 'completionDate',
 *       title: 'Completion Date',
 *       type: 'date',
 *     },
 *     {
 *       name: 'location',
 *       title: 'Location',
 *       type: 'string',
 *     },
 *     {
 *       name: 'description',
 *       title: 'Description',
 *       type: 'text',
 *     },
 *     {
 *       name: 'featured',
 *       title: 'Featured',
 *       type: 'boolean',
 *     },
 *   ],
 * }
 */
