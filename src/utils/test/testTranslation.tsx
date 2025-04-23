import { render } from '@testing-library/react'
import provideTranslations from '@utils/test/provideTranslations'
import { Messages } from '@/types/i18n/messages'

type CheckTranslation = (messages: Messages) => void

async function testTranslation(
	el: JSX.Element,
	checkTranslation: CheckTranslation,
) {
	const { rerender } = render(<></>)

	const languages = ['en', 'pl']
	for (const language of languages) {
		const message = (await import(`@messages/${language}`)) as {
			default: Messages
		}

		rerender(await provideTranslations(el, message.default, language))
		await checkTranslation(message.default)
	}
}

export default testTranslation
