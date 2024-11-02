'use client'
import { isValidPassword, isValidEmail } from '@utils/auth/validate'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import OAuthButton from '@components/buttons/OAuthButton'
import Input from '@components/inputs/Input'
import Button from '@components/buttons/Button'
import { Link, useRouter } from '@/i18n/routing'
import Alert from '@components/Alert'

import { useTranslations } from 'next-intl'
import messagesEnum from '@enum/messages'
import nameSpaceEnum from '@enum/name-space'

export default function RegisterForm() {
	const { registerForm, errors } = messagesEnum
	const t = useTranslations(nameSpaceEnum.registerForm)
	const t_errors = useTranslations(nameSpaceEnum.errors)
	const router = useRouter()

	const [nameError, setNameError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [emailError, setEmailError] = useState('')
	const [firstSubmit, setFirstSubmit] = useState(true)
	const [serverError, setServerError] = useState('')

	const apiUrl = process.env.NEXT_PUBLIC_API_URL

	type FormData = {
		[k: string]: FormDataEntryValue
	}

	type ErrorResponse = {
		error: string
	}

	const registerUser = (data: FormData) => {
		axios
			.post(`${apiUrl}/auth/register`, data)
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
				} else {
					setServerError(t_errors(errors.serverDown))
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

	const validateName = (name: string) => {
		if (!firstSubmit) {
			const error = validateField(name as string, t(registerForm.nameRequired))
			setNameError(error)
		}
	}

	const validateEmail = (email: string) => {
		if (!firstSubmit) {
			const error = validateField(
				email as string,
				t(registerForm.emailRequired),
				t(registerForm.emailInvalid),
				isValidEmail,
			)
			setEmailError(error)
		}
	}

	const validatePassword = (password: string) => {
		if (!firstSubmit) {
			const error = validateField(
				password as string,
				t(registerForm.passwordRequired),
				t(registerForm.passwordInvalid),
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

		const { name, email, password } = data

		const errors = {
			nameError: validateField(name as string, t(registerForm.nameRequired)),
			emailError: validateField(
				email as string,
				t(registerForm.emailRequired),
				t(registerForm.emailInvalid),
				isValidEmail,
			),
			passwordError: validateField(
				password as string,
				t(registerForm.passwordRequired),
				t(registerForm.passwordInvalid),
				isValidPassword,
			),
		}

		const hasErrors = Object.values(errors).some(error => error)

		setNameError(errors.nameError)
		setEmailError(errors.emailError)
		setPasswordError(errors.passwordError)

		if (hasErrors) return

		registerUser(data)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='bg-white p-5 grid gap-10 rounded-xl col-span-full sm:col-start-2 sm:col-end-8
				lg:col-start-5 lg:col-end-9 h-min'
		>
			<section className='flex flex-col gap-5'>
				<section className='flex flex-col gap-[10px]'>
					<h1 className='text-[26px] leading-8 text-center font-bold'>
						{t(registerForm.title)}
					</h1>
					<p className='text-sm leading-5 text-gray-500 text-center'>
						{t(registerForm.titleHint)}
					</p>
				</section>

				<section className='flex justify-center gap-4'>
					<OAuthButton apple />
					<OAuthButton google />
					<OAuthButton fb />
				</section>
			</section>

			<section className='flex flex-col gap-[10px]'>
				{serverError && <Alert>{serverError}</Alert>}
				<div className='flex items-center gap-2'>
					<span className='h-[1px] flex-1 bg-gray-200'></span>
					<span className='text-sm leading-5 text-gray-400'>
						{t(registerForm.orWithYoureEmail)}
					</span>
					<span className='h-[1px] flex-1 bg-gray-200'></span>
				</div>
				<section className='grid gap-7'>
					<Input
						label={t(registerForm.name)}
						name='name'
						error={nameError}
						validateCb={validateName}
					/>
					<Input
						label='E-mail'
						name='email'
						type='email'
						error={emailError}
						validateCb={validateEmail}
					/>
					<Input
						label={t(registerForm.password)}
						name='password'
						type='password'
						error={passwordError}
						validateCb={validatePassword}
					/>
				</section>
			</section>

			<Button>{t(registerForm.signUp)}</Button>

			<p className='text-sm leading-5 text-center'>
				{t(registerForm.haveAnAccount)}
				<Link
					className='text-brand font-semibold hover:text-brand-600 active:text-brand-700'
					href={'/auth/login'}
				>
					{t(registerForm.signIn)}
				</Link>
			</p>
		</form>
	)
}
