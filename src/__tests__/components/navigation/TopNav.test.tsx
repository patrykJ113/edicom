import { render, screen, fireEvent } from '@testing-library/react'
import TopNav from '@/app/components/navigation/TopNav'
import provideTranslations from '@/utils/provideTranslations'

test('elements in TopNav are diplyed corectly', async () => {
	const { rerender } = render(
		await provideTranslations(<TopNav isLoggedIn={true} />),
	)

	screen.getByRole('button')
	screen.getByRole('article')
	screen.getByRole('link', {
		name: /new listing/i,
	})
	let logo = screen.getByRole('heading')
	expect(logo).toHaveTextContent(/edicom/i)

	rerender(await provideTranslations(<TopNav isLoggedIn={false} />))

	logo = screen.getByRole('heading')
	expect(logo).toHaveTextContent(/edicom/i)

	screen.getByRole('link', {
		name: /log in/i,
	})

	screen.getByRole('link', {
		name: /register/i,
	})
})

test('dropdown is toggled correctly in TopNav', async () => {
	render(await provideTranslations(<TopNav isLoggedIn={true} />))

	const btn = screen.getByRole('button')
	const dropDown = screen.getByRole('article')

	fireEvent.click(btn)
	expect(dropDown).not.toHaveClass('opacity-0')

	fireEvent.click(btn)
	expect(dropDown).toHaveClass('opacity-0')
})

test('TopNav is translated corectly', async () => {
	const languges = ['en', 'pl']

	const { rerender } = render(<span>Dumy element to be replaced </span>)

	for (const language of languges) {
		const message = await import(`@messages/${language}`)
		const { topNav } = message.default

		rerender(
			await provideTranslations(
				<TopNav isLoggedIn={false} />,
				message.default,
				language,
			),
		)

		const register = screen.getByRole('link', {
			name: new RegExp(topNav.register, 'i'),
		})
		expect(register).toHaveTextContent(topNav.register)

		const logIn = screen.getByRole('link', {
			name: new RegExp(topNav.logIn),
		})
		expect(logIn).toHaveTextContent(topNav.logIn)
	}

	for (const language of languges) {
		const message = await import(`@messages/${language}`)
		const { topNav } = message.default

		rerender(
			await provideTranslations(
				<TopNav isLoggedIn={true} />,
				message.default,
				language,
			),
		)

		const newListing = screen.getByRole('link', {
			name: new RegExp(topNav.newListing, 'i'),
		})
		expect(newListing).toHaveTextContent(topNav.newListing)
	}
})
