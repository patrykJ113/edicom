import { render, screen, fireEvent } from '@testing-library/react'
import YoureAccountBtn from '@components/buttons/YoureAccountBtn'
import provideTranslations from '@/utils/test/provideTranslations'

test('button toggles dropdown on click', async () => {
	render(await provideTranslations(<YoureAccountBtn />))
	screen.debug()
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

test('Dropdown has the corect amount of items', async () => {
	render(await provideTranslations(<YoureAccountBtn />))

	const listItems = screen.getAllByRole('listitem')

	expect(listItems).toHaveLength(6)
})

test('renders correct language translations', async () => {
	const languages = ['en', 'pl']

	const { rerender } = render(<span>Dumy element to be replaced</span>)

	for (const language of languages) {
		const message = await import(`@messages/${language}`)
		const {
			default: { youreAccountBtn },
		} = message

		rerender(
			await provideTranslations(<YoureAccountBtn />, message.default, language),
		)

		screen.getByRole('button', {
			name: new RegExp(youreAccountBtn.btnLabel, 'i'),
		})

		screen.getByText(new RegExp(youreAccountBtn.options.listings, 'i'), {
			selector: 'li',
		})

		screen.getByText(new RegExp(youreAccountBtn.options.messages, 'i'), {
			selector: 'li',
		})

		screen.getByText(new RegExp(youreAccountBtn.options.payments, 'i'), {
			selector: 'li',
		})

		screen.getByText(new RegExp(youreAccountBtn.options.settings, 'i'), {
			selector: 'li',
		})

		screen.getByText(new RegExp(youreAccountBtn.options.foloved, 'i'), {
			selector: 'li',
		})

		screen.getByText(new RegExp(youreAccountBtn.options.logOut, 'i'), {
			selector: 'li',
		})
	}
})
