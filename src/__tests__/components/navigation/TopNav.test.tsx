import { render, screen, fireEvent } from '@testing-library/react'
import TopNav from '@/app/components/navigation/TopNav'
import provideTranslations from '@/app/components/provideTranslations'
import testTranslation from '@/app/components/testTranslation'

describe('TopNav', () => {
	it('Elements in TopNav are displayed correctly', async () => {
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

	it('Dropdown is toggled correctly in TopNav', async () => {
		render(await provideTranslations(<TopNav isLoggedIn={true} />))

		const btn = screen.getByRole('button')
		const dropDown = screen.getByRole('article')

		fireEvent.click(btn)
		expect(dropDown).not.toHaveClass('opacity-0')

		fireEvent.click(btn)
		expect(dropDown).toHaveClass('opacity-0')
	})

	it('TopNav renders correct language translations', async () => {
		await testTranslation(<TopNav isLoggedIn={false} />, ({ topNav }) => {
			const register = screen.getByRole('link', {
				name: new RegExp(topNav.register, 'i'),
			})
			expect(register).toHaveTextContent(topNav.register)

			const logIn = screen.getByRole('link', {
				name: new RegExp(topNav.logIn),
			})
			expect(logIn).toHaveTextContent(topNav.logIn)
		})

		await testTranslation(<TopNav isLoggedIn={true} />, ({ topNav }) => {
			const newListing = screen.getByRole('link', {
				name: new RegExp(topNav.newListing, 'i'),
			})
			expect(newListing).toHaveTextContent(topNav.newListing)
		})
	})
})
