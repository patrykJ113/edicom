import BottomNav from '@components/navigation/BottomNav'
import { render, screen, fireEvent } from '@testing-library/react'
import provideTranslations from '@/utils/test/provideTranslations'
import testTranslation from '@/utils/test/testTranslation'

jest.mock('@svg/home.svg', () => 'svg')

test('BottomNav has five buttons', async () => {
	render(await provideTranslations(<BottomNav />))

	const listeItems = screen.getAllByRole('listitem')
	expect(listeItems).toHaveLength(5)
})

test('BottomNav click worck corectly', async () => {
	render(await provideTranslations(<BottomNav />))
	const listeItems = screen.getAllByRole('listitem')

	for (const listeItem of listeItems) {
		fireEvent.click(listeItem)

		const svg = listeItem.querySelector('svg')
		expect(svg).toHaveClass('fill-brand')

		const span = listeItem.querySelector('span')
		expect(span).toHaveClass('text-brand')
		expect(span).not.toHaveClass('text-gray-800')

		listeItems.forEach(li => {
			if (li !== listeItem) {
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

test('renders correct language translations', async () => {
	await testTranslation(<BottomNav />, ({ bottomNav }) => {
		screen.getByText(bottomNav.search, { selector: 'span' })
		screen.getByText(bottomNav.favorites, { selector: 'span' })
		screen.getByText(bottomNav.add, { selector: 'span' })
		screen.getByText(bottomNav.messages, { selector: 'span' })
		screen.getByText(bottomNav.account, { selector: 'span' })
	})
})
