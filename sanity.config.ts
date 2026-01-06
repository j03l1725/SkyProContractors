import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { sanityConfig } from './src/sanity/env';
import { schemaTypes } from './src/sanity/schemaTypes';

export default defineConfig({
    name: 'default',
    title: 'Skyline Pro Contractors',

    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,

    plugins: [
        structureTool(),
        visionTool(),
    ],

    schema: {
        types: schemaTypes,
    },
});
