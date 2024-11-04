import { render, screen } from '@testing-library/react'
import RegisterForm from '@components/auth/RegisterForm'
import provideTranslations from '@/utils/test/provideTranslations'
import userEvent from '@testing-library/user-event'
import testTranslation from '@/utils/test/testTranslation'

jest.mock('@svg/eye.svg', () => 'svg')

jest.mock('@/i18n/routing', () => ({
	useRouter: () => ({
		push: jest.fn(),
	}),
	Link: ({ children }: { children: React.ReactNode }) => children,
}))

describe('RegisterForm', () => {
	describe('Initial rendering', () => {
		it('should render the register form with name, email, and password inputs', async () => {
			render(await provideTranslations(<RegisterForm />))
			screen.getByRole('textbox', {
				name: /name/i,
			})
			screen.getByRole('textbox', {
				name: /e\-mail/i,
			})
			screen.getByLabelText(/password/i)
		})

		it('should not display any error messages initially', async () => {
			render(await provideTranslations(<RegisterForm />))
			const name = screen.getByText(/name/i)
			const email = screen.getByText(/e\-mail/i)
			const password = screen.getByText(/password/i)

			const nameHint = screen.queryByText(/name is required/i)
			const emailRequired = screen.queryByText(/e\-mail is required/i)
			const emailInvalid = screen.queryByText(/e\-mail is invalid/i)
			const passwordRequired = screen.queryByText(/password is required/i)
			const passwordInvalid = screen.queryByText(
				/password must be 8\-16 characters, include an uppercase letter, lowercase letter, number, and special character \(e\.g\., ! @ # \$\)/i,
			)

			expect(name).not.toHaveClass('bg-red-50 border-red-A400')
			expect(email).not.toHaveClass('bg-red-50 border-red-A400')
			expect(password).not.toHaveClass('bg-red-50 border-red-A400')

			expect(nameHint).not.toBeInTheDocument()
			expect(emailRequired).not.toBeInTheDocument()
			expect(emailInvalid).not.toBeInTheDocument()
			expect(passwordRequired).not.toBeInTheDocument()
			expect(passwordInvalid).not.toBeInTheDocument()
		})
	})

	describe('Validation on first submit', () => {
		it('empty name, password, email inputs will fail and show is required hints', async () => {
			const { container } = render(await provideTranslations(<RegisterForm />))

			const labels = Array.from(container.querySelectorAll('label'))

			expect(labels).toHaveLength(3)

			const [name, email, password] = labels

			const signInBtn = screen.getByRole('button', {
				name: /sign up/i,
			})

			await userEvent.click(signInBtn)

			expect(name).toHaveClass('bg-red-50 border-red-A400')
			expect(email).toHaveClass('bg-red-50 border-red-A400')
			expect(password).toHaveClass('bg-red-50 border-red-A400')

			const nameRequired = screen.queryByText(/name is required/i)
			const emailRequired = screen.queryByText(/e\-mail is required/i)
			const passwordRequired = screen.queryByText(/password is required/i)

			expect(nameRequired).toBeInTheDocument()
			expect(emailRequired).toBeInTheDocument()
			expect(passwordRequired).toBeInTheDocument()
		})

		it('invalid email adn password will show invalid hints', async () => {
			const { container } = render(await provideTranslations(<RegisterForm />))

			const labels = Array.from(container.querySelectorAll('label'))

			expect(labels).toHaveLength(3)

			const [, emailLabel, passwordLabel] = labels

			const email = screen.getByRole('textbox', {
				name: /e\-mail/i,
			})
			const password = screen.getByLabelText(/password/i)

			const signInBtn = screen.getByRole('button', {
				name: /sign up/i,
			})

			await userEvent.type(email, 'email')
			await userEvent.type(password, 'password')
			await userEvent.click(signInBtn)

			expect(emailLabel).toHaveClass('bg-red-50 border-red-A400')
			expect(passwordLabel).toHaveClass('bg-red-50 border-red-A400')

			const emailRequired = screen.queryByText(/e\-mail is invalid/i)
			const passwordRequired = screen.queryByText(
				/password must be 8\-16 characters, include an uppercase letter, lowercase letter, number, and special character \(e\.g\., ! @ # \$\)/i,
			)

			expect(emailRequired).toBeInTheDocument()
			expect(passwordRequired).toBeInTheDocument()
		})

		it('when all inputs are valid the form should send a request to the server', async () => {
			render(await provideTranslations(<RegisterForm />))
		})
	})

	describe('Dynamic input validation', () => {
		it('name, email and password inputs display the correct hints', async () => {
			const { container } = render(await provideTranslations(<RegisterForm />))

			const signInBtn = screen.getByRole('button', {
				name: /sign up/i,
			})

			await userEvent.click(signInBtn)

			const labels = Array.from(container.querySelectorAll('label'))

			expect(labels).toHaveLength(3)

			const [nameLabel, emailLabel, passwordLabel] = labels

			let nameHint = screen.queryByText(/name is required/i)
			let emailHint = screen.queryByText(/e\-mail is required/i)
			let passwordHint = screen.queryByText(/password is required/i)

			expect(nameLabel).toHaveClass('bg-red-50 border-red-A400')
			expect(emailLabel).toHaveClass('bg-red-50 border-red-A400')
			expect(passwordLabel).toHaveClass('bg-red-50 border-red-A400')

			expect(nameHint).toBeInTheDocument()
			expect(emailHint).toBeInTheDocument()
			expect(passwordHint).toBeInTheDocument()

			const name = screen.getByRole('textbox', {
				name: /name/i,
			})
			const email = screen.getByRole('textbox', {
				name: /e\-mail/i,
			})
			const password = screen.getByLabelText(/password/i)

			await userEvent.type(name, 'name')
			await userEvent.type(email, 'email')
			await userEvent.type(password, 'password')

			emailHint = screen.queryByText(/e\-mail is invalid/i)
			passwordHint = screen.queryByText(
				/password must be 8\-16 characters, include an uppercase letter, lowercase letter, number, and special character \(e\.g\., ! @ # \$\)/i,
			)
			expect(emailHint).toBeInTheDocument()
			expect(passwordHint).toBeInTheDocument()

			await userEvent.clear(name)
			await userEvent.clear(email)
			await userEvent.clear(password)

			nameHint = screen.queryByText(/name is required/i)
			emailHint = screen.queryByText(/e\-mail is required/i)
			passwordHint = screen.queryByText(/password is required/i)

			expect(nameHint).toBeInTheDocument()
			expect(emailHint).toBeInTheDocument()
			expect(passwordHint).toBeInTheDocument()
		})

		describe('RegisterForm API Integration', () => {
			it('User registered successfully', async () => {
				render(await provideTranslations(<RegisterForm />))
			})

			it('Server Error', async () => {
				render(await provideTranslations(<RegisterForm />))
			})

			it('Network Error', async () => {
				render(await provideTranslations(<RegisterForm />))
			})
		})

		describe.only('language translations', () => {
			it('the correct text is being displayed for the register form', async () => {
				await testTranslation(<RegisterForm />, ({ registerForm }) => {
					screen.getByRole('heading', {
						name: new RegExp(registerForm.title, 'i'),
					})

					screen.getByText(new RegExp(registerForm.titleHint, 'i'))

					screen.getByText(new RegExp(registerForm.orWithYoureEmail, 'i'))

					screen.getByRole('textbox', {
						name: new RegExp(registerForm.name, 'i'),
					})

					screen.getByLabelText(new RegExp(registerForm.password, 'i'))

					screen.getByRole('button', {
						name: new RegExp(registerForm.signUp, 'i'),
					})

					screen.getByText(new RegExp(registerForm.haveAnAccount, 'i'))
					screen.getByText(new RegExp(registerForm.signIn, 'i'))
				})
			})

			it('the correct text is being displayed for the required input hints', async () => {
				await testTranslation(<RegisterForm />, async ({ registerForm }) => {
					const signInBtn = screen.getByRole('button', {
						name: new RegExp(registerForm.signUp, 'i'),
					})

					await userEvent.click(signInBtn)

					screen.getByText(new RegExp(registerForm.nameRequired, 'i'))
					screen.getByText(new RegExp(registerForm.emailRequired, 'i'))
					screen.getByText(new RegExp(registerForm.passwordRequired, 'i'))
				})
			})

			it('the correct text is being displayed for the invalid input hints', async () => {
				await testTranslation(<RegisterForm />, async ({ registerForm }) => {
					const email = screen.getByRole('textbox', {
						name: /e\-mail/i,
					})
					const password = screen.getByLabelText(
						new RegExp(registerForm.password, 'i'),
					)

					const signInBtn = screen.getByRole('button', {
						name: new RegExp(registerForm.signUp, 'i'),
					})

					await userEvent.type(email, 'email')
					await userEvent.type(password, 'password')
					await userEvent.click(signInBtn)

					screen.getByText(new RegExp(registerForm.emailInvalid, 'i'))
					if (registerForm.passwordInvalid.startsWith('Password')) {
						screen.getByText(
							/password must be 8-16 characters, include an uppercase letter, lowercase letter, number, and special character \(e\.g\., ! @ # \$\)/i,
						)
					} else {
						screen.getByText(
							/hasło musi mieć 8-16 znaków, zawierać wielką literę, małą literę, cyfrę oraz znak specjalny \(np\. ! @ # \$\)/i,
						)
					}
				})
			})
		})
	})
})
