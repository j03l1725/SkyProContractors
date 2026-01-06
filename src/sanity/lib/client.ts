import { createClient } from 'next-sanity';
import { sanityConfig, validateSanityConfig } from '../env';

/**
 * Sanity Client for Server Components
 * Use this client for fetching data in Server Components
 */

// Only create client if projectId is available
const hasValidConfig = validateSanityConfig();

export const client = hasValidConfig
    ? createClient({
        projectId: sanityConfig.projectId,
        dataset: sanityConfig.dataset,
        apiVersion: sanityConfig.apiVersion,
        useCdn: sanityConfig.useCdn,
        token: sanityConfig.token,
        perspective: 'published',
    })
    : null;

/**
 * Helper function to fetch data with error handling
 */
export async function sanityFetch<T = unknown>({
    query,
    params = {},
    tags = [],
}: {
    query: string;
    params?: Record<string, unknown>;
    tags?: string[];
}): Promise<T | null> {
    // Return null if client is not configured
    if (!client) {
        console.warn(
            '⚠️  Sanity client not configured. Add NEXT_PUBLIC_SANITY_PROJECT_ID to .env.local'
        );
        return null;
    }

    try {
        return await client.fetch<T>(query, params, {
            next: {
                tags,
                revalidate: sanityConfig.useCdn ? 60 : 0,
            },
        });
    } catch (error) {
        console.error('Sanity fetch error:', error);
        return null;
    }
}
