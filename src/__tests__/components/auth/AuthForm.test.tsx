import { screen, render } from '@testing-library/react'
import AuthForm from '@components/auth/AuthForm'
import provideTranslations from '@utils/test/provideTranslations'
import { useRouter } from '@/i18n/routing'
import userEvent from '@testing-library/user-event'
import testTranslation from '@utils/test/testTranslation'
import { server } from '@mocks/server'
import { rest } from 'msw'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

jest.mock('@svg/eye.svg', () => 'svg')

jest.mock('@/i18n/routing', () => ({
	useRouter: jest.fn(),
	Link: ({ children }: { children: React.ReactNode }) => children,
}))

const getSingUpBtn = () =>
	screen.getByRole('button', {
		name: /sign up/i,
	})

const getSingInBtn = () =>
	screen.getByRole('button', {
		name: /sign in/i,
	})

const getLabels = (container: HTMLElement) => {
	const labels = Array.from(container.querySelectorAll('label'))
	return labels
}

const labelsHaveErrorStyles = (...elements: HTMLElement[]) => {
	elements.forEach(element => {
		expect(element).toHaveClass('bg-red-50 border-red-A400')
	})
}

const getRequiredNameHint = () => screen.queryByText(/name is required/i)

const getRequiredEmailHint = () => screen.queryByText(/e\-mail is required/i)

const getRequiredPasswordHint = () =>
	screen.queryByText(/password is required/i)

const getInvalidEmailHint = () =>
	screen.queryByText(/Email address has the wrong format/i)

const getInvalidPasswordHint = () =>
	screen.queryByText(
		/password must be 8\-16 characters, include an uppercase letter, lowercase letter, number, and special character \(e\.g\., ! @ # \$\)/i,
	)

const getNameInput = () =>
	screen.getByRole('textbox', {
		name: /name/i,
	})

const getEmailInput = () =>
	screen.getByRole('textbox', {
		name: /e\-mail/i,
	})

const getPasswordInput = () => screen.getByLabelText(/password/i)

const push = jest.fn() as jest.Mock<ReturnType<typeof useRouter>['push']>

;(useRouter as jest.Mock).mockReturnValue({ push })

describe('AuthForm', () => {
	describe('the AuthForm renders correctly', () => {
		it('the right elements are displayed for the register from', async () => {
			render(await provideTranslations(<AuthForm register />))

			screen.getByRole('heading', {
				name: /create account/i,
			})

			screen.getByText(/register with your social account/i)

			screen.getByText(/or with you’re email/i)

			getNameInput()
			getEmailInput()
			getPasswordInput()
			getSingUpBtn()

			screen.getByText(/have an account \?/i)

			screen.getByText(/sign in/i)
		})

		it('the right elements are displayed for the login from', async () => {
			render(await provideTranslations(<AuthForm />))

			screen.getByRole('heading', {
				name: /sign in/i,
			})

			screen.getByText(/welcome back! log in with your social account/i)
			screen.getByText(/or continue with email/i)

			getEmailInput()
			getPasswordInput()

			screen.getByText(/remember me/i)
			screen.getByText(/forgot password\?/i)

			getSingInBtn()

			screen.getByText(/have an account \?/i)
			screen.getByText(/sign up/i)
		})

		it('the Name input is not displayed for the Login form', async () => {
			render(await provideTranslations(<AuthForm />))

			const name = screen.queryByRole('textbox', {
				name: /name/i,
			})

			expect(name).not.toBeInTheDocument()
		})

		it('the forgot password and remember me is not displayed for the Register form', async () => {
			render(await provideTranslations(<AuthForm register />))

			const rememberMe = screen.queryByAltText(/remember me/i)
			const forgotPassword = screen.queryByText(/forgot password\?/i)

			expect(rememberMe).not.toBeInTheDocument()
			expect(forgotPassword).not.toBeInTheDocument()
		})

		it('the checkbox is checked by default in the login form', async () => {
			render(await provideTranslations(<AuthForm />))

			const checkBox = screen.getByRole('checkbox')

			expect(checkBox).toBeChecked()
		})
	})

	describe('Validation on first submit', () => {
		it('empty name, email and password inputs display error styles and required hints for register form', async () => {
			const { container } = render(
				await provideTranslations(<AuthForm register />),
			)

			const signUpBtn = getSingUpBtn()

			await userEvent.click(signUpBtn)

			const [nameLabel, emailLabel, passwordLabel] = getLabels(container)

			labelsHaveErrorStyles(nameLabel, emailLabel, passwordLabel)

			getRequiredNameHint()
			getRequiredEmailHint()
			getRequiredPasswordHint()
		})

		it('invalid email and password inputs display error styles and invalid hints for register form', async () => {
			const { container } = render(
				await provideTranslations(<AuthForm register />),
			)

			const email = getEmailInput()

			const password = getPasswordInput()

			const signUpBtn = getSingUpBtn()

			await userEvent.type(email, 'email')
			await userEvent.type(password, 'password')
			await userEvent.click(signUpBtn)

			const [, emailLabel, passwordLabel] = getLabels(container)

			labelsHaveErrorStyles(emailLabel, passwordLabel)

			getInvalidEmailHint()
			getInvalidPasswordHint()
		})

		it('empty email and password inputs display required hints for login form', async () => {
			const { container } = render(await provideTranslations(<AuthForm />))

			const signInBtn = getSingInBtn()

			await userEvent.click(signInBtn)

			const [emailLabel, passwordLabel] = getLabels(container)

			labelsHaveErrorStyles(emailLabel, passwordLabel)

			screen.queryByText(/e\-mail is required/i)
			screen.queryByText(/password is required/i)
		})

		it('invalid email and password inputs display invalid hints for login form', async () => {
			const { container } = render(await provideTranslations(<AuthForm />))

			const email = getEmailInput()

			const password = getPasswordInput()

			const signInBtn = getSingInBtn()

			await userEvent.type(email, 'email')
			await userEvent.type(password, 'password')
			await userEvent.click(signInBtn)

			const [emailLabel, passwordLabel] = getLabels(container)

			labelsHaveErrorStyles(emailLabel, passwordLabel)

			getInvalidEmailHint()
			getInvalidPasswordHint()
		})
	})

	describe('Dynamic input validation', () => {
		it('name, email and password inputs display error styles and the required hints for register form on second submit', async () => {
			const { container } = render(
				await provideTranslations(<AuthForm register />),
			)

			const signUpBtn = getSingUpBtn()
			const name = getNameInput()
			const email = getEmailInput()
			const password = getPasswordInput()

			await userEvent.type(name, 'name')
			await userEvent.type(email, 'email')
			await userEvent.type(password, 'password')
			await userEvent.click(signUpBtn)

			await userEvent.clear(name)
			await userEvent.clear(email)
			await userEvent.clear(password)

			const [nameLabel, emailLabel, passwordLabel] = getLabels(container)

			labelsHaveErrorStyles(nameLabel, emailLabel, passwordLabel)

			getRequiredNameHint()
			getRequiredEmailHint()
			getRequiredPasswordHint()
		})

		it('email and password inputs display error styles and the invalid hints for register form on second submit', async () => {
			const { container } = render(
				await provideTranslations(<AuthForm register />),
			)

			const signUpBtn = getSingUpBtn()

			const email = getEmailInput()
			const password = getPasswordInput()

			await userEvent.click(signUpBtn)

			await userEvent.type(email, 'email')
			await userEvent.type(password, 'password')

			const [, emailLabel, passwordLabel] = getLabels(container)

			labelsHaveErrorStyles(emailLabel, passwordLabel)

			getInvalidEmailHint()
			getInvalidPasswordHint()
		})

		it('email and password inputs display error styles and the required hints for login form on second submit', async () => {
			const { container } = render(await provideTranslations(<AuthForm />))

			const signInBtn = getSingInBtn()

			const email = getEmailInput()
			const password = getPasswordInput()

			await userEvent.type(email, 'email')
			await userEvent.type(password, 'password')
			await userEvent.click(signInBtn)

			await userEvent.clear(email)
			await userEvent.clear(password)

			const [emailLabel, passwordLabel] = getLabels(container)

			labelsHaveErrorStyles(emailLabel, passwordLabel)

			getRequiredEmailHint()
			getRequiredPasswordHint()
		})

		it('email and password inputs display error styles and the invalid hints for login form on second submit', async () => {
			const { container } = render(await provideTranslations(<AuthForm />))

			const signInBtn = getSingInBtn()

			const email = getEmailInput()
			const password = getPasswordInput()

			await userEvent.click(signInBtn)

			await userEvent.type(email, 'email')
			await userEvent.type(password, 'password')

			const [emailLabel, passwordLabel] = getLabels(container)

			labelsHaveErrorStyles(emailLabel, passwordLabel)

			getInvalidEmailHint()
			getInvalidPasswordHint()
		})
	})

	describe('AuthForm API Integration', () => {
		it('Register form creates user successful', async () => {
			render(await provideTranslations(<AuthForm register />))

			const name = getNameInput()

			const email = getEmailInput()

			const password = getPasswordInput()

			const signUpBtn = getSingUpBtn()

			await userEvent.type(name, 'name')
			await userEvent.type(email, 'john@gmail.com')
			await userEvent.type(password, 'Ww1@aa1klm1321')
			await userEvent.click(signUpBtn)

			expect(push).toHaveBeenCalledTimes(1)
			expect(push).toHaveBeenCalledWith('/')
		})

		it('The Register displays the alert when a server error occurred', async () => {
			render(await provideTranslations(<AuthForm register />))

			const responseMsg =
				'Something went wrong when creating a user on our side'

			server.use(
				rest.post(`${apiUrl}/auth/register`, (req, res, ctx) => {
					return res(ctx.status(500), ctx.json({ error: responseMsg }))
				}),
			)

			const name = getNameInput()
			const email = getEmailInput()
			const password = getPasswordInput()
			const signUpBtn = getSingUpBtn()

			await userEvent.type(name, 'name')
			await userEvent.type(email, 'john@gmail.com')
			await userEvent.type(password, 'Ww1@aa1klm1321')
			await userEvent.click(signUpBtn)

			expect(push).toHaveBeenCalledTimes(0)
			screen.getByText(responseMsg)
		})

		it('The Register form handles server is down error', async () => {
			render(await provideTranslations(<AuthForm register />))

			server.use(
				rest.post(`${apiUrl}/auth/register`, (req, res) => {
					return res.networkError('')
				}),
			)

			const name = getNameInput()
			const email = getEmailInput()
			const password = getPasswordInput()
			const signUpBtn = getSingUpBtn()

			await userEvent.type(name, 'name')
			await userEvent.type(email, 'john@gmail.com')
			await userEvent.type(password, 'Ww1@aa1klm1321')
			await userEvent.click(signUpBtn)

			expect(push).toHaveBeenCalledTimes(0)
			screen.getByText(
				/Oops! It looks like our servers are down. We're working on getting things back to normal/i,
			)
		})

		it('User logs in successfully', async () => {
			render(await provideTranslations(<AuthForm />))

			const responseMsg = 'Login successful'

			server.use(
				rest.post(`${apiUrl}/auth/login`, (req, res, ctx) => {
					return res(ctx.status(200), ctx.json({ message: responseMsg }))
				}),
			)

			const email = getEmailInput()
			const password = getPasswordInput()

			const signInBtn = getSingInBtn()

			await userEvent.type(email, 'john@gmail.com')
			await userEvent.type(password, 'Ww1@aa1klm1321')
			await userEvent.click(signInBtn)

			expect(push).toHaveBeenCalledTimes(1)
			expect(push).toHaveBeenCalledWith('/')
		})

		it('Login form displays the alert when a server error occurred', async () => {
			render(await provideTranslations(<AuthForm />))

			const responseMsg = 'Invalid credentials'

			server.use(
				rest.post(`${apiUrl}/auth/login`, (req, res, ctx) => {
					return res(ctx.status(400), ctx.json({ error: responseMsg }))
				}),
			)

			const email = getEmailInput()
			const password = getPasswordInput()
			const signInBtn = getSingInBtn()

			await userEvent.type(email, 'john@gmail.com')
			await userEvent.type(password, 'Ww1@aa1klm1321')
			await userEvent.click(signInBtn)

			expect(push).toHaveBeenCalledTimes(0)
			screen.getByText(new RegExp(responseMsg, 'i'))
		})

		it('The login form handles server is down error', async () => {
			render(await provideTranslations(<AuthForm />))

			server.use(
				rest.post(`${apiUrl}/auth/login`, (req, res) => {
					return res.networkError('')
				}),
			)

			const email = getEmailInput()
			const password = getPasswordInput()

			const signUpBtn = getSingInBtn()

			await userEvent.type(email, 'john@gmail.com')
			await userEvent.type(password, 'Ww1@aa1klm1321')
			await userEvent.click(signUpBtn)

			expect(push).toHaveBeenCalledTimes(0)
			screen.getByText(
				/Oops! It looks like our servers are down. We're working on getting things back to normal/i,
			)
		})
	})

	describe('translations', () => {
		it('Correct translations are displayed for the register form ', async () => {
			await testTranslation(<AuthForm register />, ({ authForm }) => {
				screen.getByRole('heading', {
					name: new RegExp(authForm.createAccount, 'i'),
				})

				screen.getByText(new RegExp(authForm.registerWith, 'i'))

				screen.getByText(new RegExp(authForm.orWithYoureEmail, 'i'))

				screen.getByRole('textbox', {
					name: new RegExp(authForm.name, 'i'),
				})

				screen.getByLabelText(new RegExp(authForm.password, 'i'))

				screen.getByRole('button', {
					name: new RegExp(authForm.signUp, 'i'),
				})

				screen.getByText(new RegExp(authForm.haveAnAccount, 'i'))

				screen.getByText(new RegExp(authForm.signIn, 'i'))
			})
		})

		it('Correct translations are displayed for the login form ', async () => {
			await testTranslation(<AuthForm />, ({ authForm }) => {
				screen.getByRole('heading', {
					name: new RegExp(authForm.signIn, 'i'),
				})

				screen.getByText(new RegExp(authForm.logInWith, 'i'))

				screen.getByText(new RegExp(authForm.orContinueWithEmail, 'i'))

				screen.getByLabelText(new RegExp(authForm.password, 'i'))

				screen.getByText(new RegExp(authForm.rememberMe, 'i'))

				screen.getByText(new RegExp(authForm.forgotPassword, 'i'))

				screen.getByRole('button', {
					name: new RegExp(authForm.signIn, 'i'),
				})

				screen.getByText(new RegExp(authForm.haveAnAccount, 'i'))

				screen.getByText(new RegExp(authForm.signUp, 'i'))
			})
		})

		it('Correct translations are displayed for required hints in the register form', async () => {
			await testTranslation(<AuthForm register />, async ({ authForm }) => {
				const signUpBtn = screen.getByRole('button', {
					name: new RegExp(authForm.signUp, 'i'),
				})

				await userEvent.click(signUpBtn)

				screen.getByText(new RegExp(authForm.nameRequired, 'i'))
				screen.getByText(new RegExp(authForm.emailRequired, 'i'))
				screen.getByText(new RegExp(authForm.passwordRequired, 'i'))
			})
		})

		it('Correct translations are displayed for invalid hints in the register form', async () => {
			await testTranslation(<AuthForm register />, async ({ authForm }) => {
				const signUpBtn = screen.getByRole('button', {
					name: new RegExp(authForm.signUp, 'i'),
				})

				const email = getEmailInput()

				const password = screen.getByLabelText(
					new RegExp(authForm.password, 'i'),
				)

				await userEvent.click(signUpBtn)
				await userEvent.type(email, 'email')
				await userEvent.type(password, 'password')

				screen.getByText(new RegExp(authForm.emailInvalid, 'i'))

				if (authForm.passwordInvalid.startsWith('Password')) {
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

		it('Correct translations are displayed for required hints in the login form', async () => {
			await testTranslation(<AuthForm />, async ({ authForm }) => {
				const signInBtn = screen.getByRole('button', {
					name: new RegExp(authForm.signIn, 'i'),
				})

				await userEvent.click(signInBtn)

				screen.getByText(new RegExp(authForm.emailRequired, 'i'))
				screen.getByText(new RegExp(authForm.passwordRequired, 'i'))
			})
		})

		it('Correct translations are displayed for invalid hints in the login form', async () => {
			await testTranslation(<AuthForm />, async ({ authForm }) => {
				const signInBtn = screen.getByRole('button', {
					name: new RegExp(authForm.signIn, 'i'),
				})

				const email = getEmailInput()
				const password = screen.getByLabelText(
					new RegExp(authForm.password, 'i'),
				)

				await userEvent.click(signInBtn)
				await userEvent.type(email, 'email')
				await userEvent.type(password, 'password')

				screen.getByText(new RegExp(authForm.emailInvalid, 'i'))
				if (authForm.passwordInvalid.startsWith('Password')) {
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
