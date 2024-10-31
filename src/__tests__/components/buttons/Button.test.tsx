import { render, screen } from '@testing-library/react'
import Button from '@components/buttons/Button'

describe('Button', () => {
	it('Button displays text passed as children', () => {
		const label = 'Hello'
		render(<Button>{label}</Button>)

		screen.getByRole('button', {
			name: new RegExp(label, 'i'),
		})
	})
})
