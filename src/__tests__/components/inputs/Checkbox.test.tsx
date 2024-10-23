import { render, screen } from '@testing-library/react'
import Checkbox from '@components/inputs/Checkbox'

test('', () => {
    const label = 'Hello'
    render(<Checkbox>{label}</Checkbox>)

    screen.getByLabelText(new RegExp(label, 'i'))
})
