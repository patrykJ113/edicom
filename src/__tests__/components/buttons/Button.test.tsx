import { render, screen } from '@testing-library/react'
import Button from '@components/buttons/Button'

test('Button displays text', () => {
	const label = 'Hello'
	render(<Button>{label}</Button>)

	screen.getByRole('button', {
		name: new RegExp(label, 'i'),
	})
})
