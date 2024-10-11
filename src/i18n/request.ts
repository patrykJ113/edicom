import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ locale }: { locale: string }) => {
    
	if (!routing.locales.includes(locale as 'pl' | 'en')) notFound()

	return {
		messages: (await import(`../messages/${locale}.ts`)).default,
	}
})
