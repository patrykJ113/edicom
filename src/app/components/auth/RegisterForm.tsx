'use client'
import Input from '@components/inputs/Input'
import Button from '@components/buttons/Button'
import OAuthButton from '@components/buttons/OAuthButton'
import { isValidPassword, isValidEmail } from '@utils/auth/validate'
import { Link } from '@/i18n/routing'
import axios from 'axios'
import { useState } from 'react'

export default function RegisterForm() {
	const [passwordError, setPasswordError] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [firstSubmit, setFirstSubmit] = useState(true)

	const validateEmail = (email: string) => {
		if (!firstSubmit) {
			setEmailError(!isValidEmail(email))
		}
	}
	const validatePassword = (password: string) => {
		if (!firstSubmit) {
			setPasswordError(!isValidPassword(password))
		}
	}

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

	const handlSumbit = (e: React.FormEvent<HTMLFormElement>) => {
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
			onSubmit={handlSumbit}
			className='bg-white p-5 flex flex-col gap-7 rounded col-span-full sm:col-start-2
				sm:col-end-8 lg:col-start-5 lg:col-end-9 h-min'
		>
			<section className='flex flex-col gap-y-3'>
				<h2 className='text-[26px] font-bold leading-8 text-center'>
					Create Account
				</h2>
				<p className='text-base leading-7 text-gray-600 text-center'>
					Fill your information below or register with your social account
				</p>
			</section>

			<section className='flex flex-col gap-5'>
				<Input
					hint='email is required'
					type='email'
					label='E-mail'
					name='email'
					error={emailError}
					validateCallBack={validateEmail}
				/>
				<Input
					hint={`
						Password must be 8-16 characters, include an uppercase letter, 
						lowercase letter, number, and special character (e.g., ! @ # $)`}
					type='password'
					label='Password'
					name='password'
					error={passwordError}
					validateCallBack={validatePassword}
				/>
				<Button>Sign Up</Button>
			</section>

			<section className='flex flex-col gap-y-5'>
				<p
					className='flex justify-center items-center gap-x-2 text-base text-gray-500 leading-6
						text-center after:block after:h-1/2 after:border-t after:border-gray-500
						after:w-9 before:block before:border-t before:border-gray-500 before:w-9'
				>
					Or Sign Up with
				</p>
				<div className='flex gap-x-3 justify-center'>
					<OAuthButton apple />
					<OAuthButton google />
					<OAuthButton fb />
				</div>
				<p className='text-sm leading-5 text-center'>
					<span>Already have an account ? </span>
					<Link
						href={'/auth/login'}
						className='text-brand font-semibold underline-offset-4 underline'
					>
						Sing In
					</Link>
				</p>
			</section>
		</form>
	)
}
