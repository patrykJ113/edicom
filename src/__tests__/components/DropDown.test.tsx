import { render, screen } from '@testing-library/react'
import DropDown from '@/app/components/DropDown'

test('toggle the dropdown', () => {
	const { rerender } = render(<DropDown options={[]} opened={true} />)
	const dropDown = screen.getByRole('article')

	expect(dropDown).not.toHaveClass('opacity-0')

	rerender(<DropDown options={[]} opened={false} />)

    expect(dropDown).toHaveClass('opacity-0')
})


test('renders the article', () => {

    const options = ['item 1', 'item 2', 'item 3']
	render(<DropDown options={options} opened={true} />)
	const listItmes = screen.getAllByRole('listitem')

    expect(listItmes).toHaveLength(options.length)

    listItmes.forEach((listItme, index) => {
        expect(listItme).toHaveTextContent(options[index])
    })

})
