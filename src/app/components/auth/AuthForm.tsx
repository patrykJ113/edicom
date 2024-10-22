'use client'
import { useSearchParams } from 'next/navigation'
import Input from '@components/inputs/Input'
import Button from '@components/buttons/Button'
import Checkbox from '@components/inputs/Checkbox'
import OAuthButton from '@components/buttons/OAuthButton'
import { Link } from '@/i18n/routing'

export default function AuthForm() {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;

	const searchParams = useSearchParams()

	const isSignUp = () => {
		const type = searchParams.get('type')
		return type === 'signup'
	}

	const getLabel = () => {
		return isSignUp() ? 'Create Account' : 'Sign In'
	}

	const getLabelHint = () => {
		return isSignUp() ?
				'Fill your information below or register with your social account'
			:	"Hi! Welcome back, you've been missed"
	}

	const getBtnLabe = () => {
		return isSignUp() ? 'Sign Up' : 'Sign In'
	}

	const getActionPrompt = () => {
		return isSignUp() ? 'Alredy have an account ? ' : "Don't have an account ? "
	}

	const handlSumbit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const data = Object.fromEntries(formData.entries())
		console.log(JSON.stringify(data))

		fetch(`${apiUrl}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(res => res.json())
			.then(res => console.log(res))
			.catch(err => console.log(err))
	}

	return (
		<form
			onSubmit={handlSumbit}
			className='bg-white p-5 flex flex-col gap-7 rounded col-span-full sm:col-start-2
				sm:col-end-8 lg:col-start-5 lg:col-end-9 h-min'
		>
			<section className='flex flex-col gap-y-3'>
				<h2 className='text-[26px] font-bold leading-8 text-center'>
					{getLabel()}
				</h2>
				<p className='text-base leading-7 text-gray-600 text-center'>
					{getLabelHint()}
				</p>
			</section>

			<section className='flex flex-col gap-5'>
				<Input
					hint='email is required'
					type='email'
					label='E-mail'
					name='email'
				/>
				<Input
					hint='Password must be 8-16 characters, include an uppercase letter, lowercase letter, number, and special character (e.g., ! @ # $)'
					type='password'
					label='Password'
					name='password'
				/>
				<div className={`flex justify-between ${isSignUp() && 'hidden'}`}>
					<Checkbox>Remember Me</Checkbox>
					<span
						className='text-brand underline-offset-4 underline hover:cursor-pointer text-sm leading-5
							font-semibold'
					>
						Forgot Password?
					</span>
				</div>
				<Button>{getBtnLabe()}</Button>
			</section>

			<section className='flex flex-col gap-y-5'>
				<p
					className='flex justify-center items-center gap-x-2 text-base text-gray-500 leading-6
						text-center after:block after:h-1/2 after:border-t after:border-gray-500
						after:w-9 before:block before:border-t before:border-gray-500 before:w-9'
				>
					Or Sign {isSignUp() ? 'Up' : 'In'} with
				</p>
				<div className='flex gap-x-3 justify-center'>
					<OAuthButton apple />
					<OAuthButton google />
					<OAuthButton fb />
				</div>
				<p className='text-sm leading-5 text-center'>
					{getActionPrompt()}
					<Link
						href={`/auth${isSignUp() ? '' : '?type=signup'}`}
						className='text-brand font-semibold underline-offset-4 underline'
					>
						{isSignUp() ? 'Sing In' : 'Sing Up'}
					</Link>
				</p>
			</section>
		</form>
	)
}
