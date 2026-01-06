/**
 * Sanity Environment Variables
 * These values are loaded from .env.local
 */

export const sanityConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
    useCdn: process.env.NODE_ENV === 'production',
    // Optional read token for preview mode
    token: process.env.SANITY_API_READ_TOKEN,
};

// Validation helper
export function validateSanityConfig() {
    if (!sanityConfig.projectId) {
        console.warn(
            '⚠️  Sanity project ID not found. Please add NEXT_PUBLIC_SANITY_PROJECT_ID to your .env.local file.'
        );
        return false;
    }
    return true;
}
