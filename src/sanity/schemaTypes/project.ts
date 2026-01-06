import { defineType } from 'sanity';

/**
 * Project Schema for Sanity CMS
 * Defines the structure for construction projects
 */
export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                    description: 'Important for SEO and accessibility',
                },
            ],
        },
        {
            name: 'gallery',
            title: 'Project Gallery',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative Text',
                            description: 'Important for SEO and accessibility',
                        },
                    ],
                },
            ],
            options: {
                layout: 'grid',
            },
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
            placeholder: 'e.g., Yonkers, NY',
        },
        {
            name: 'completionDate',
            title: 'Completion Date',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
            },
        },
        {
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [
                {
                    type: 'block',
                },
            ],
        },
        {
            name: 'featured',
            title: 'Featured Project',
            type: 'boolean',
            description: 'Show this project on the homepage',
            initialValue: false,
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Roofing', value: 'roofing' },
                    { title: 'Siding', value: 'siding' },
                    { title: 'Windows', value: 'windows' },
                    { title: 'Insurance Claims', value: 'insurance' },
                    { title: 'Residential', value: 'residential' },
                    { title: 'Commercial', value: 'commercial' },
                ],
            },
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            subtitle: 'location',
        },
    },
});
