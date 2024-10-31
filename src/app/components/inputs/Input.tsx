'use client'

import { useEffect, useState } from 'react'
import Eye from '@svg/eye.svg'
import EyeOpened from '@svg/eye-opened.svg'

type Props = {
	label: string
	required?: boolean
	error?: string
	name?: string
	type?:
		| 'button'
		| 'date'
		| 'email'
		| 'file'
		| 'image'
		| 'number'
		| 'password'
		| 'submit'
		| 'tel'
		| 'text'
}

export default function Input({
	label,
	required,
	error,
	name,
	type = 'text',
}: Props) {
	const [isFocused, setIsFocused] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [inputType, setInputType] = useState(type)

	const handleFocus = () => {
		setIsFocused(true)
	}

	const handleBlur = () => {
		setIsFocused(false)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const getFocusStyle = () => {
		return inputValue || isFocused ?
				'text-xs leading-4 top-2'
			:	'text-base leading-6 top-1/2 -translate-y-1/2'
	}

	const isError = () => {
		return error !== '' && error
	}

	const isPassword = () => {
		return type === 'password'
	}

	const getErrorStyles = () => {
		return isError() ? 'bg-red-50 border-red-A400' : ''
	}

	const togglePwdVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setShowPassword(!showPassword)
	}

	useEffect(() => {
		if (type === 'password') {
			setInputType(showPassword ? 'text' : 'password')
		}
	}, [showPassword, type])

	return (
		<article className='flex flex-col gap-y-2'>
			<label
				className={`border-gray-300 border-2 relative focus-within:border-black rounded
					${getErrorStyles()}`}
			>
				<span
					className={`text-gray-600 absolute left-4 transition-all duration-150 ${getFocusStyle()}`}
				>
					{label}
				</span>
				<input
					type={inputType}
					name={name}
					required={required}
					className='bg-transparent outline-none text-base leading-6 pl-4 pr-12 pt-6 pb-1 w-full'
					autoComplete='off'
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
				<button
					onClick={togglePwdVisibility}
					className={!isPassword() ? 'hidden' : ''}
				>
					{showPassword ?
						<EyeOpened
							className='absolute right-4 top-1/2 -translate-y-1/2 fill-gray-600 cursor-pointer
								hover:fill-gray-800 h-6 w-6'
						/>
					:	<Eye
							className='absolute right-4 top-1/2 -translate-y-1/2 fill-gray-600 cursor-pointer
								hover:fill-gray-800 h-6 w-6'
						/>
					}
				</button>
			</label>
			{isError() && (
				<p className='text-sm leading-5 text-red-A400 pl-4'>{error}</p>
			)}
		</article>
	)
}
