import { i18nOptions } from '@/resources/once-ui.config';
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
    // A list of all locales that are supported
    locales: i18nOptions.locales,
    defaultLocale: i18nOptions.defaultLocale,

    // Won't display `defaultLocale` in routes
    localePrefix: 'as-needed'
});

export type Locale = (typeof routing.locales)[number];