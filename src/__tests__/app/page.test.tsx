import { render, screen } from '@testing-library/react'
import Home from '../../app/page'


test('Hello World is Displyed', () => {
    render(<Home/>)

    const h1 = screen.getByRole('heading', {
			name: /hello world/i,
		})

    expect(h1).toBeInTheDocument()
})