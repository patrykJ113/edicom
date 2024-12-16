import { render, screen, fireEvent } from '@testing-library/react'
import YourAccountBtn from '@/app/components/buttons/YourAccountBtn'
import testTranslation from '@/utils/test/testTranslation'
import provideTranslations from '@/utils/test/provideTranslations'

describe('YourAccountBtn', () => {
	it('YourAccountBtn toggles dropdown on click', async () => {
		render(await provideTranslations(<YourAccountBtn />))
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

	it('Dropdown has the correct amount of items', async () => {
		render(await provideTranslations(<YourAccountBtn />))

		const listItems = screen.getAllByRole('listitem')

		expect(listItems).toHaveLength(6)
	})

	it('YourAccountBtn renders correct language translations', async () => {
		await testTranslation(<YourAccountBtn />, ({ yourAccountBtn }) => {
			screen.getByRole('button', {
				name: new RegExp(yourAccountBtn.btnLabel, 'i'),
			})

			screen.getByText(new RegExp(yourAccountBtn.options.listings, 'i'), {
				selector: 'li',
			})

			screen.getByText(new RegExp(yourAccountBtn.options.messages, 'i'), {
				selector: 'li',
			})

			screen.getByText(new RegExp(yourAccountBtn.options.payments, 'i'), {
				selector: 'li',
			})

			screen.getByText(new RegExp(yourAccountBtn.options.settings, 'i'), {
				selector: 'li',
			})

			screen.getByText(new RegExp(yourAccountBtn.options.followed, 'i'), {
				selector: 'li',
			})

			screen.getByText(new RegExp(yourAccountBtn.options.logOut, 'i'), {
				selector: 'li',
			})
		})
	})
})
