import { cleanup, render, screen } from '@testing-library/react'
import Input from '@/app/components/inputs/Input'
import userEvent from '@testing-library/user-event'

jest.mock('@svg/eye.svg', () => 'svg')

describe('Input', () => {
	describe('Label', () => {
		it('Input displays label', () => {
			const { container } = render(<Input label='Name' />)
			const label = container.querySelector('label')
			const span = label?.querySelector('span')

			expect(span).toBeInTheDocument()
			expect(span).toHaveTextContent('Name')
		})

		it('Label changes sizes plus moves up or down when input is focused or blurred', async () => {
			const { container } = render(<Input label='Name' />)
			const label = container.querySelector('label')
			const span = label?.querySelector('span')
			const input = screen.getByRole('textbox')

			expect(span).toHaveClass('text-base leading-6 top-1/2 -translate-y-1/2')

			await userEvent.click(input)

			expect(span).toHaveClass('text-xs leading-4 top-2')

			await userEvent.tab()

			expect(span).toHaveClass('text-base leading-6 top-1/2 -translate-y-1/2')
		})

		it('Label stays in place when the input has a value in it', async () => {
			const { container } = render(<Input label='Name' />)
			const label = container.querySelector('label')
			const span = label?.querySelector('span')
			const input = screen.getByRole('textbox')

			await userEvent.type(input, 'Hello')
			await userEvent.tab()

			expect(span).toHaveClass('text-xs leading-4 top-2')

			await userEvent.clear(input)
			await userEvent.tab()

			expect(span).toHaveClass('text-base leading-6 top-1/2 -translate-y-1/2')
		})
	})

	it('Required attribute is added to the html element', () => {
		const { rerender } = render(<Input label='Name' required />)
		const input = screen.getByRole('textbox')

		expect(input).toHaveAttribute('required')

		rerender(<Input label='Name' />)

		expect(input).not.toHaveAttribute('required')
	})

	describe('Error', () => {
		it('Input hasa a red outline and background color', () => {
			const { rerender, container } = render(
				<Input label='Name' error='error occurred' />,
			)

			const label = container.querySelector('label')

			expect(label).toHaveClass('bg-red-50 border-red-A400')

			rerender(<Input label='Name' />)

			expect(label).not.toHaveClass('bg-red-50 border-red-A400')
		})

		it('Hint is displayed with the error message bellow the input', () => {
			const { rerender } = render(<Input label='Name' error='error occurred' />)

			const hint = screen.getByText(/error occurred/i)

			rerender(<Input label='Name' />)

			expect(hint).not.toBeInTheDocument()
		})
	})

	it('Name attribute is applied to the input when name prop is specified', () => {
		const { rerender } = render(<Input label='Name' name='Name' />)
		const input = screen.getByRole('textbox')

		expect(input).toHaveAttribute('name', 'Name')

		rerender(<Input label='Name' />)

		expect(input).not.toHaveAttribute('name')
	})

	it('Type attribute is applied to the input when type prop is specified', () => {
		const types: [
			'file',
			'email',
			'image',
			'number',
			'password',
			'tel',
			'text',
			'date',
		] = ['file', 'email', 'image', 'number', 'password', 'tel', 'text', 'date']

		types.forEach(type => {
			cleanup()
			const { container } = render(<Input label={'Name'} type={type} />)

			const input = container.querySelector('input')
			expect(input).toBeInTheDocument()
			expect(input).toHaveAttribute('type', type)
		})
	})

	it('The password visibility is toggled when clicking the eye icons', async () => {
		const { container } = render(<Input label='Name' type='password' />)
		const showPassword = screen.getByRole('button')
		const input = container.querySelector('input[type="password"]')

		expect(input).toBeInTheDocument()

		await userEvent.click(showPassword)

		expect(input).toHaveAttribute('type', 'text')

		await userEvent.click(showPassword)
		expect(input).toHaveAttribute('type', 'password')
	})
})
