'use client'
import { isValidPassword, isValidEmail } from '@utils/auth/validate'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import OAuthButton from '@components/buttons/OAuthButton'
import Input from '@components/inputs/Input'
import Button from '@components/buttons/Button'
import { Link, useRouter } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import Alert from '@components/Alert'
import Spinner from '@components/Spinner'

import { useTranslations } from 'next-intl'
import messagesEnum from '@enum/messages'
import nameSpaceEnum from '@enum/name-space'
import Checkbox from '@components/inputs/Checkbox'

type Props = {
	register?: boolean
}

export default function AuthForm({ register }: Props) {
	const { authForm, errors } = messagesEnum
	const t = useTranslations(nameSpaceEnum.authForm)
	const t_errors = useTranslations(nameSpaceEnum.errors)

	const router = useRouter()
	const locale = useLocale()

	const [nameError, setNameError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [emailError, setEmailError] = useState('')
	const [firstSubmit, setFirstSubmit] = useState(true)
	const [serverError, setServerError] = useState('')
	const [loading, setLoading] = useState(false)

	const apiUrl = process.env.NEXT_PUBLIC_API_URL
	const requestUrl = `${apiUrl}/auth/${register ? 'register' : 'login'}`

	type FormData = {
		[k: string]: FormDataEntryValue
	}

	type ErrorResponse = {
		error: string
	}

	type Errors = {
		nameError?: string
		emailError: string
		passwordError: string
	}

	const handleAuthRequest = (data: FormData) => {
		setLoading(true)
		
		axios
			.post(`${requestUrl}?lang=${locale}`, data)
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

	const validateName = (name: string) => {
		if (!firstSubmit) {
			const error = validateField(name as string, t(authForm.nameRequired))
			setNameError(error)
		}
	}

	const validateEmail = (email: string) => {
		if (!firstSubmit) {
			const error = validateField(
				email as string,
				t(authForm.emailRequired),
				t(authForm.emailInvalid),
				isValidEmail,
			)
			setEmailError(error)
		}
	}

	const validatePassword = (password: string) => {
		if (!firstSubmit) {
			const error = validateField(
				password as string,
				t(authForm.passwordRequired),
				t(authForm.passwordInvalid),
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

		const errors: Errors = {
			emailError: validateField(
				email as string,
				t(authForm.emailRequired),
				t(authForm.emailInvalid),
				isValidEmail,
			),
			passwordError: validateField(
				password as string,
				t(authForm.passwordRequired),
				t(authForm.passwordInvalid),
				isValidPassword,
			),
		}

		if (name !== undefined) {
			errors.nameError = validateField(name as string, t(authForm.nameRequired))
		}

		const hasErrors = Object.values(errors).some(error => error)

		if (errors.emailError) {
			setNameError(errors.nameError ?? '')
		}
		setEmailError(errors.emailError)
		setPasswordError(errors.passwordError)

		if (hasErrors) return

		handleAuthRequest(data)
	}

	const tile = () => (register ? t(authForm.createAccount) : t(authForm.signIn))
	const tileHint = () =>
		register ? t(authForm.registerWith) : t(authForm.logInWith)
	const orWith = () =>
		register ? t(authForm.orWithYoureEmail) : t(authForm.orContinueWithEmail)
	const linkText = () => (register ? t(authForm.signIn) : t(authForm.signUp))
	const submitBtn = () => (register ? t(authForm.signUp) : t(authForm.signIn))

	return (
		<form
			onSubmit={handleSubmit}
			className='bg-white p-5 grid gap-5 rounded-xl col-span-full sm:col-start-2 sm:col-end-8
				lg:col-start-5 lg:col-end-9 h-min relative'
		>
			<section className='flex flex-col gap-5'>
				<section className='flex flex-col gap-[10px]'>
					<h1 className='text-[26px] leading-8 text-center font-bold'>
						{tile()}
					</h1>
					<p className='text-sm leading-5 text-gray-500 text-center'>
						{tileHint()}
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
						<span className='text-sm leading-5 text-gray-400'>{orWith()}</span>
						<span className='h-[1px] flex-1 bg-gray-200'></span>
					</div>
					<section className='grid gap-7'>
						{register && (
							<Input
								label={t(authForm.name)}
								name='name'
								error={nameError}
								validateCb={validateName}
							/>
						)}
						<Input
							label='E-mail'
							name='email'
							type='text'
							error={emailError}
							validateCb={validateEmail}
						/>
						<Input
							label={t(authForm.password)}
							name='password'
							type='password'
							error={passwordError}
							validateCb={validatePassword}
						/>
					</section>
					{!register && (
						<section className={'flex justify-between mt-[6px]'}>
							<Checkbox checked>{t(authForm.rememberMe)}</Checkbox>
							<span className='text-brand hover:cursor-pointer text-sm leading-5 font-semibold'>
								{t(authForm.forgotPassword)}
							</span>
						</section>
					)}
				</section>

				<Button>{submitBtn()}</Button>

				<p className='text-sm leading-5 text-center'>
					{t(authForm.haveAnAccount)}
					<Link
						className='text-brand font-semibold hover:text-brand-600 active:text-brand-700'
						href={`/auth/${register ? 'login' : 'register'}`}
					>
						{linkText()}
					</Link>
				</p>
				{loading && <Spinner />}
			</section>
		</form>
	)
}
