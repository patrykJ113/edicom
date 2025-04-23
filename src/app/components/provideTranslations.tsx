import { Messages } from '@/types/i18n/messages'
import { NextIntlClientProvider } from 'next-intl'
import ReduxProvider from '@components/ReduxProvider'

async function provideTranslations(
	el: JSX.Element,
	messages?: Messages,
	language: string = 'en',
) {
	if (!messages) {
		;({ default: messages } = await import(`@messages/${language}`))
	}

	return (
		<ReduxProvider>
			<NextIntlClientProvider messages={messages} locale={language}>
				{el}
			</NextIntlClientProvider>
		</ReduxProvider>
	)
}

export default provideTranslations
