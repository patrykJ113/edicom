import { Messages } from '@/app/types/messages'
import { NextIntlClientProvider } from 'next-intl'

async function provideTranslations(
	el: JSX.Element,
	messages?: Messages,
	language: string = 'en',
) {
	if (!messages) {
		({ default: messages } = await import(`@messages/${language}`))
	}

	return (
		<NextIntlClientProvider messages={messages} locale={language}>
			{el}
		</NextIntlClientProvider>
	)
}

export default provideTranslations
