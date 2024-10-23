import { render, screen } from '@testing-library/react'
import Button from '@components/buttons/Button'

test('Button displays text', () => {
	const Label = 'Hello'
	render(<Button>{Label}</Button>)

	screen.getByRole('button', {
		name: new RegExp(Label, 'i'),
	})
})
