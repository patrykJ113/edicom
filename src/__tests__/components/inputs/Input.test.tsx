import { render, screen } from '@testing-library/react'
import Input from '@/app/components/inputs/Input'
import userEvent from '@testing-library/user-event'

test('Input displays label', () => {
	const label = 'Name'
	render(<Input label={label} />)
	screen.getByRole('heading', { name: new RegExp(label, 'i') })
})

test('Displayes * if input is required', () => {
	const label = 'Name'
	const { rerender } = render(<Input label={label} required />)

	let h2 = screen.getByRole('heading', {
		name: new RegExp(label, 'i'),
		level: 2,
	})

	let span = h2.querySelector('span')
	expect(span).toBeInTheDocument()
	expect(span).toHaveTextContent('*')

	rerender(<Input label={label} />)

	h2 = screen.getByRole('heading', {
		name: new RegExp(label, 'i'),
		level: 2,
	})

	span = h2.querySelector('span')
	expect(span).not.toBeInTheDocument()
})

test('Renders larger input when the large option is set', () => {
	const label = 'Name'
	const { rerender } = render(<Input label={label} large />)

	let h2 = screen.getByRole('heading', {
		name: new RegExp(label, 'i'),
		level: 2,
	})

	let input = screen.getByRole('textbox')

	expect(h2).toHaveClass('text-base leading-7')
	expect(input).toHaveClass('h-14')

	rerender(<Input label={label} />)

	h2 = screen.getByRole('heading', {
		name: new RegExp(label, 'i'),
		level: 2,
	})

	input = screen.getByRole('textbox')

	expect(h2).not.toHaveClass('text-base leading-7')
	expect(input).not.toHaveClass('h-14')
})

test('Displays hint', () => {
	const label = 'Name'
	const hint = 'Some Hint'
	const { rerender } = render(<Input label={label} hint={hint} />)

	screen.getByText(new RegExp(hint, 'i'))

	rerender(<Input label={label} />)
	expect(screen.queryByText(new RegExp(hint, 'i'))).not.toBeInTheDocument()
})

test('Displays character count', () => {
	const { rerender } = render(<Input label={'Name'} characterCount />)

	let atricle = screen.getByRole('article')
	let characterCount = atricle.querySelector('div > span')
	expect(characterCount).toBeInTheDocument()

	rerender(<Input label={'Name'} />)

	atricle = screen.getByRole('article')
	characterCount = atricle.querySelector('div > span')
	expect(characterCount).not.toBeInTheDocument()
})

test('Displays character count changes on input', async () => {
	render(<Input label={'Name'} characterCount />)

	const input = screen.getByRole('textbox')
	const atricle = screen.getByRole('article')
	const characterCount = atricle.querySelector('div > span')

	expect(characterCount).toHaveTextContent('0/100')

	let inputTest = 'Hello'
	await userEvent.type(input, inputTest)

	expect(characterCount).toHaveTextContent(`${inputTest.length}/100`)

	inputTest = 'Hello World'
	await userEvent.clear(input)
	await userEvent.type(input, inputTest)
	expect(characterCount).toHaveTextContent(`${inputTest.length}/100`)

	await userEvent.clear(input)
	expect(characterCount).toHaveTextContent('0/100')
})

test('Applies error styles when the error prop is true', () => {
	const { rerender } = render(
		<Input label={'Name'} hint={'Some Hint'} characterCount />,
	)

	const atricle = screen.getByRole('article')
	let input = screen.getByRole('textbox')
	let hint = atricle.querySelector('div > span:first-child')
	let characterCount = atricle.querySelector('div > span:last-child')

	expect(input).toHaveClass('border-gray-500')
	expect(hint).toHaveClass('text-gray-700')
	expect(characterCount).toHaveClass('text-gray-700')

	rerender(<Input label={'Name'} hint={'Some Hint'} characterCount error />)

	input = screen.getByRole('textbox')
	hint = atricle.querySelector('div > span:first-child')
	characterCount = atricle.querySelector('div > span:last-child')

	expect(input).toHaveClass('border-red-A400')
	expect(hint).toHaveClass('text-red-A400')
	expect(characterCount).toHaveClass('text-red-A400')
})

test('Renders a filled input when the filled atribute is provided', () => {
	render(<Input label={'Name'} filled />)

	const input = screen.getByRole('textbox')
	expect(input).toHaveClass('rounded-t-[4px] bg-gray-200 border-b')
})

test('the name is applied to the input', () => {
	render(<Input label={'Name'} name='some-name' />)
	const input = screen.getByRole('textbox')

	expect(input).toHaveAttribute('name', 'some-name')
})

test('check if tye type is set corectly', () => {
	const types: [
		'button',
		'email',
		'file',
		'image',
		'number',
		'password',
		'submit',
		'tel',
		'text',
		'date'
	] = [
		'button',
		'email',
		'file',
		'image',
		'number',
		'password',
		'submit',
		'tel',
		'text',
		'date'
	]

	const { rerender } = render(<></>)

	types.forEach(type => {
		rerender(<Input label={'Name'} type={type} />)

		const input = document.querySelector(`input[type=${type}]`)

		expect(input).toHaveAttribute('type', type);
	})
})

test('validateCallBack is called when typing in the input', async () => {
	const validateCallBack = jest.fn()

	render(<Input label={'Name'} validateCallBack={validateCallBack} />)
	const input = screen.getByRole('textbox')
	await userEvent.type(input, 'Hello')

	expect(validateCallBack).toHaveBeenCalledTimes('Hello'.length)
})
