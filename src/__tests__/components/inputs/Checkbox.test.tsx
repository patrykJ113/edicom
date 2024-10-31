import { render, screen } from '@testing-library/react'
import Checkbox from '@components/inputs/Checkbox'

describe('CheckBox', () => {
	it('CheckBox displays the text passed as children', () => {
		const label = 'Hello'
		render(<Checkbox>{label}</Checkbox>)

		screen.getByLabelText(new RegExp(label, 'i'))
	})
})
