import { render, screen } from '@testing-library/react'
import Checkbox from '@components/inputs/Checkbox'

describe('CheckBox', () => {
	it('CheckBox displays the text passed as children', () => {
		const label = 'Hello'
		render(<Checkbox>{label}</Checkbox>)

		screen.getByLabelText(new RegExp(label, 'i'))
	})

	it('the checkbox is checked when the checked propr is provided', () => {
		render(<Checkbox checked>Check</Checkbox>)

		const checkBox = screen.getByLabelText(new RegExp('Check', 'i'))

		expect(checkBox).toBeChecked()
	})
})
