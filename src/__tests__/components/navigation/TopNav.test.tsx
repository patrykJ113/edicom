import { render, screen, fireEvent } from '@testing-library/react'
import TopNav from '@/app/components/navigation/TopNav'
import { NextIntlClientProvider } from 'next-intl'

test('elements in TopNav are diplyed corectly', async () => {
	const en = await import('@messages/en')
	const { rerender } = render(
		<NextIntlClientProvider messages={en.default} locale={'en'}>
			<TopNav isLoggedIn={true} />
		</NextIntlClientProvider>,
	)

	screen.getByRole('button')
	screen.getByRole('article')
	screen.getByRole('link', {
		name: /new listing/i,
	})
	let logo = screen.getByRole('heading')
	expect(logo).toHaveTextContent(/edicom/i)

	rerender(
		<NextIntlClientProvider messages={en.default} locale={'en'}>
			<TopNav isLoggedIn={false} />
		</NextIntlClientProvider>,
	)

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
	const en = await import('@messages/en')
	render(
		<NextIntlClientProvider messages={en.default} locale={'en'}>
			<TopNav isLoggedIn={true} />
		</NextIntlClientProvider>,
	)

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
		const lang = await import(`@messages/${language}`)
		const { topNav } = lang.default

		rerender(
			<NextIntlClientProvider messages={lang.default} locale={language}>
				<TopNav isLoggedIn={false} />
			</NextIntlClientProvider>,
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
		const lang = await import(`@messages/${language}`)
		const { topNav } = lang.default

		rerender(
			<NextIntlClientProvider messages={lang.default} locale={language}>
				<TopNav isLoggedIn={true} />
			</NextIntlClientProvider>,
		)

		const newListing = screen.getByRole('link', {
			name: new RegExp(topNav.newListing, 'i'),
		})
		expect(newListing).toHaveTextContent(topNav.newListing)
	}
})
