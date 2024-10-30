'use client'

import { useState } from 'react'

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
				'text-xs leading-4 top-[2px]'
			:	'text-base leading-6 top-1/2 -translate-y-1/2'
	}

	const isError = () => {
		return error !== '' && error
	}

	const getErrorStyles = () => {
		return isError() ? 'bg-red-50 border-red-A400' : ''
	}

	return (
		<article className='flex flex-col gap-y-2'>
			<label
				className={`border-gray-300 border-2 px-4 pt-6 pb-1 relative focus-within:border-black
					rounded ${getErrorStyles()}`}
			>
				<span
					className={`text-gray-600 absolute left-4 transition-all duration-150 ${getFocusStyle()}`}
				>
					{label}
				</span>
				<input
					type={type}
					name={name}
					required={required}
					autoComplete='true'
					className='bg-transparent outline-none text-base leading-6'
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
			</label>
			{isError() && <p className='text-sm leading-5 text-red-A400 pl-4'>{error}</p>}
		</article>
	)
}
