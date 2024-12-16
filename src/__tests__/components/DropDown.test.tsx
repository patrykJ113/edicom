import { render, screen } from '@testing-library/react'
import DropDown from '@components/DropDown'

describe('DropDown', () => {
	it('The dropdown closes and opens', () => {
		const { rerender } = render(<DropDown options={[]} opened={true} />)
		const dropDown = screen.getByRole('article')

		expect(dropDown).not.toHaveClass('opacity-0')

		rerender(<DropDown options={[]} opened={false} />)

		expect(dropDown).toHaveClass('opacity-0')
	})

	it('The dropdown displays the passed list of options', () => {
		const options = ['item 1', 'item 2', 'item 3']
		render(<DropDown options={options} opened={true} />)
		const listItems = screen.getAllByRole('listitem')

		expect(listItems).toHaveLength(options.length)

		listItems.forEach((listItem, index) => {
			expect(listItem).toHaveTextContent(options[index])
		})
	})
})
