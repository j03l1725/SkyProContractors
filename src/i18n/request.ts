import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// Import messages statically
import en from '../../messages/en.json';
import es from '../../messages/es.json';

const messages = { en, es } as const;

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (!locale || !routing.locales.includes(locale as keyof typeof messages)) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: messages[locale as keyof typeof messages]
    };
});
