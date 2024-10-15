import { render } from '@testing-library/react'
import provideTranslations from '@utils/test/provideTranslations'
import { Messages } from '@/app/types/messages'

type CheckTranslation = (messages: Messages) => void

async function testTranslation(
	el: JSX.Element,
	checkTranslation: CheckTranslation,
) {
	const { rerender } = render(<>Dumy element to be replaced </>)

	const languges = ['en', 'pl']
	for (const language of languges) {
		const message = (await import(`@messages/${language}`)) as {
			default: Messages
		}

		rerender(await provideTranslations(el, message.default, language))
		checkTranslation(message.default)
	}
}

export default testTranslation
