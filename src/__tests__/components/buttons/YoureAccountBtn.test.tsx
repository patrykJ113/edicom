import { render, screen, fireEvent } from '@testing-library/react'
import YoureAccountBtn from '@components/buttons/YoureAccountBtn'
import { NextIntlClientProvider } from 'next-intl'

test('button toggles dropdown on click', async () => {
	const en = await import('@messages/en')
	render(
		<NextIntlClientProvider messages={en.default} locale={'en'}>
			<YoureAccountBtn />
		</NextIntlClientProvider>,
	)

	const btn = screen.getByRole('button', {
		name: /you're account/i,
	})

	const dropDown = screen.getByRole('article')
	expect(dropDown).toHaveClass('opacity-0')

	fireEvent.click(btn)
	expect(dropDown).not.toHaveClass('opacity-0')

	fireEvent.click(btn)
	expect(dropDown).toHaveClass('opacity-0')
})

test('renders correct language translations', async () => {
	const languages = ['en', 'pl']

	for (const language of languages) {
		const lang = await import(`@messages/${language}`)
		const {
			default: { youreAccountBtn },
		} = lang
		render(
			<NextIntlClientProvider messages={lang.default} locale={language}>
				<YoureAccountBtn />
			</NextIntlClientProvider>,
		)

		screen.getByRole('button', {
			name: new RegExp(youreAccountBtn.btnLabel, 'i'),
		})

		const listItmes = screen.getAllByRole('listitem')
		expect(listItmes).toHaveLength(listItmes.length)
	}
})
