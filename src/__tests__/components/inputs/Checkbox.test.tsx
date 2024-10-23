import { render, screen } from '@testing-library/react'
import Checkbox from '@components/inputs/Checkbox'

test('Check displays text', () => {
    const label = 'Hello'
    render(<Checkbox>{label}</Checkbox>)

    screen.getByLabelText(new RegExp(label, 'i'))
})
