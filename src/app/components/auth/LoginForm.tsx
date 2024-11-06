'use client'
import Input from '@components/inputs/Input'
import Checkbox from '@components/inputs/Checkbox'
import Button from '@components/buttons/Button'
import Alert from '@components/Alert'
import OAuthButton from '@components/buttons/OAuthButton'
import { isValidPassword, isValidEmail } from '@utils/auth/validate'
import { Link, useRouter } from '@/i18n/routing'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import messagesEnum from '@enum/messages'
import nameSpaceEnum from '@enum/name-space'
import Spinner from '@components/Spinner'

export default function LoginForm() {
	const { loginForm, errors } = messagesEnum
	const t = useTranslations(nameSpaceEnum.loginForm)
	const t_errors = useTranslations(nameSpaceEnum.errors)

	const [passwordError, setPasswordError] = useState('')
	const [emailError, setEmailError] = useState('')
	const [firstSubmit, setFirstSubmit] = useState(true)
	const [serverError, setServerError] = useState('')
	const [loading, setLoading] = useState(false)

	const router = useRouter()

	const apiUrl = process.env.NEXT_PUBLIC_API_URL

	type FormData = {
		[k: string]: FormDataEntryValue
	}

	type ErrorResponse = {
		error: string
	}

	const logInUser = (data: FormData) => {
		setLoading(true)
		axios
			.post(`${apiUrl}/auth/login`, data)
			.then(res => {
				// eslint-disable-next-line no-console
				console.log(res)
				router.push('/')
			})
			.catch((err: AxiosError) => {
				// eslint-disable-next-line no-console
				console.log(err)
				if (err.response && err.response.data) {
					const errorData = err.response.data as ErrorResponse
					setServerError(errorData.error)
					setLoading(false)
				} else {
					setServerError(t_errors(errors.serverDown))
					setLoading(false)
				}
			})
	}

	const validateField = (
		value: string,
		requiredMsg: string,
		invalidMsg?: string,
		isValidFn?: (val: string) => boolean,
	) => {
		if (!value) return requiredMsg
		if (isValidFn && !isValidFn(value)) return invalidMsg!
		return ''
	}

	const validateEmail = (email: string) => {
		if (!firstSubmit) {
			const error = validateField(
				email as string,
				t(loginForm.emailRequired),
				t(loginForm.emailInvalid),
				isValidEmail,
			)
			setEmailError(error)
		}
	}

	const validatePassword = (password: string) => {
		if (!firstSubmit) {
			const error = validateField(
				password as string,
				t(loginForm.passwordRequired),
				t(loginForm.passwordInvalid),
				isValidPassword,
			)
			setPasswordError(error)
		}
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setFirstSubmit(false)

		const formData = new FormData(e.currentTarget)
		const data = Object.fromEntries(formData.entries())

		const { email, password } = data

		const errors = {
			emailError: validateField(
				email as string,
				t(loginForm.emailRequired),
				t(loginForm.emailInvalid),
				isValidEmail,
			),
			passwordError: validateField(
				password as string,
				t(loginForm.passwordRequired),
				t(loginForm.passwordInvalid),
				isValidPassword,
			),
		}

		const hasErrors = Object.values(errors).some(error => error)

		setEmailError(errors.emailError)
		setPasswordError(errors.passwordError)

		if (hasErrors) return

		logInUser(data)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='bg-white p-5 grid gap-5 rounded-xl col-span-full sm:col-start-2 sm:col-end-8
				lg:col-start-5 lg:col-end-9 h-min relative'
		>
			<section className='flex flex-col gap-5'>
				<section className='flex flex-col gap-[10px]'>
					<h1 className='text-[26px] leading-8 text-center font-bold'>
						{t(loginForm.title)}
					</h1>
					<p className='text-sm leading-5 text-gray-500 text-center'>
						{t(loginForm.titleHint)}
					</p>
				</section>
			</section>

			<section className='relative flex flex-col gap-10'>
				<section className='flex justify-center gap-4'>
					<OAuthButton apple />
					<OAuthButton google />
					<OAuthButton fb />
				</section>

				<section className='flex flex-col gap-[10px]'>
					{serverError && <Alert>{serverError}</Alert>}
					<div className='flex items-center gap-2'>
						<span className='h-[1px] flex-1 bg-gray-200'></span>
						<span className='text-sm leading-5 text-gray-400'>
							{t(loginForm.orContinueWithEmail)}
						</span>
						<span className='h-[1px] flex-1 bg-gray-200'></span>
					</div>
					<section className='grid gap-7'>
						<Input
							label='E-mail'
							name='email'
							type='text'
							error={emailError}
							validateCb={validateEmail}
						/>
						<Input
							label={t(loginForm.password)}
							name='password'
							type='password'
							error={passwordError}
							validateCb={validatePassword}
						/>
					</section>
					<section className={'flex justify-between mt-[6px]'}>
						<Checkbox>{t(loginForm.rememberMe)}</Checkbox>
						<span className='text-brand hover:cursor-pointer text-sm leading-5 font-semibold'>
							{t(loginForm.forgotPassword)}
						</span>
					</section>
				</section>

				<Button>{t(loginForm.signUp)}</Button>

				<p className='text-sm leading-5 text-center'>
					{t(loginForm.noAccount)}
					<Link
						className='text-brand font-semibold hover:text-brand-600 active:text-brand-700'
						href={'/auth/register'}
					>
						{t(loginForm.signUp)}
					</Link>
				</p>
				{loading && <Spinner />}
			</section>
		</form>
	)
}
