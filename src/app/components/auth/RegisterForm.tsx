'use client'
import { isValidPassword, isValidEmail } from '@utils/auth/validate'
import axios from 'axios'
import { useState } from 'react'
import OAuthButton from '../buttons/OAuthButton'
import Input from '@components/inputs/Input'
import Button from '@components/buttons/Button'
import { Link } from '@/i18n/routing'

import { useTranslations } from 'next-intl'
import messagesEnum from '@enum/messages'
import nameSpaceEnum from '@enum/name-space'

export default function RegisterForm() {
	const { registerForm } = messagesEnum
	const t = useTranslations(nameSpaceEnum.registerForm)

	const [passwordError, setPasswordError] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [firstSubmit, setFirstSubmit] = useState(true)

	// const validateEmail = (email: string) => {
	// 	if (!firstSubmit) {
	// 		setEmailError(!isValidEmail(email))
	// 	}
	// }
	// const validatePassword = (password: string) => {
	// 	if (!firstSubmit) {
	// 		setPasswordError(!isValidPassword(password))
	// 	}
	// }

	const apiUrl = process.env.NEXT_PUBLIC_API_URL

	type FormData = {
		[k: string]: FormDataEntryValue
	}

	const registerUser = (data: FormData) => {
		axios
			.post(`${apiUrl}/auth/register`, data)
			// eslint-disable-next-line no-console
			.then(res => console.log(res))
			// eslint-disable-next-line no-console
			.catch(err => console.log(err))
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const data = Object.fromEntries(formData.entries())

		if (firstSubmit) {
			setEmailError(!isValidEmail(data.email as string))
			setPasswordError(!isValidPassword(data.password as string))
			setFirstSubmit(false)
		}

		if (emailError || passwordError) {
			return
		}

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
				<div className='flex items-center gap-2'>
					<span className='h-[1px] flex-1 bg-gray-200'></span>
					<span className='text-sm leading-5 text-gray-400'>
						{t(registerForm.orWithYoureEmail)}
					</span>
					<span className='h-[1px] flex-1 bg-gray-200'></span>
				</div>
				<section className='grid gap-7'>
					<Input label='Name' name='name' />
					<Input label='E-mail' name='email' type='email' />
					<Input label='Password' name='password' type='password' />
				</section>
			</section>

			<Button>Sign Up</Button>

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
