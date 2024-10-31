import {isValidPassword, isValidEmail} from '@utils/auth/validate'

test('Validates password correctly', () => {
    expect(isValidPassword('')).toBe(false)
    expect(isValidPassword('W')).toBe(false)
    expect(isValidPassword('Ww')).toBe(false)
    expect(isValidPassword('Ww1')).toBe(false)
    expect(isValidPassword('Ww1@')).toBe(false)
    expect(isValidPassword('Ww1@aaa')).toBe(false)
    expect(isValidPassword('Ww1@aaaaaaaaaaaaa')).toBe(false)

    expect(isValidPassword('Ww1@aaaa')).toBe(true)
    expect(isValidPassword('Ww1@aaaaaaaaaaaa')).toBe(true)
})

test('Validates email correctly', () => {
    expect(isValidEmail('123')).toBe(false)
    expect(isValidEmail('123@')).toBe(false)
    expect(isValidEmail('123@.')).toBe(false)
    expect(isValidEmail('123@.com')).toBe(false)

    expect(isValidEmail('123@google.com')).toBe(true)
})