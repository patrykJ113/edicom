import BottomNav from '@components/navigation/BottomNav'
import { render, screen, fireEvent } from '@testing-library/react'
import provideTranslations from '@/utils/test/provideTranslations'
import testTranslation from '@/utils/test/testTranslation'

jest.mock('@svg/home.svg', () => 'svg')

describe('BottomNav', () => {
	it('BottomNav has five buttons', async () => {
		render(await provideTranslations(<BottomNav />))

		const listItems = screen.getAllByRole('listitem')
		expect(listItems).toHaveLength(5)
	})

	it('The links in BottomNav apply styles when they are selected', async () => {
		render(await provideTranslations(<BottomNav />))
		const listItems = screen.getAllByRole('listitem')

		for (const listItem of listItems) {
			fireEvent.click(listItem)

			const svg = listItem.querySelector('svg')
			expect(svg).toHaveClass('fill-brand')

			const span = listItem.querySelector('span')
			expect(span).toHaveClass('text-brand')
			expect(span).not.toHaveClass('text-gray-800')

			listItems.forEach(li => {
				if (li !== listItem) {
					const svg = li.querySelector('svg')
					expect(svg).not.toHaveClass('fill-brand')
					expect(svg).toHaveClass('fill-gray-800')

					const span = li.querySelector('span')
					expect(span).not.toHaveClass('text-brand')
					expect(span).toHaveClass('text-gray-800')
				}
			})
		}
	})

	it('BottomNav renders correct language translations', async () => {
		await testTranslation(<BottomNav />, ({ bottomNav }) => {
			screen.getByText(bottomNav.search, { selector: 'span' })
			screen.getByText(bottomNav.favorites, { selector: 'span' })
			screen.getByText(bottomNav.add, { selector: 'span' })
			screen.getByText(bottomNav.messages, { selector: 'span' })
			screen.getByText(bottomNav.account, { selector: 'span' })
		})
	})
})
