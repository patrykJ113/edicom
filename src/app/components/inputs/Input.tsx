'use client'

import { useState } from 'react'

type Props = {
	label: string
	large?: boolean
	required?: boolean
	hint?: string
	error?: boolean
	characterCount?: boolean
	filled?: boolean
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
	validateCallBack?: (str: string) => void
	// icon: boolean !!! maybe add in the feature
}

export default function Input({
	label,
	required,
	large,
	characterCount,
	hint,
	error,
	filled,
	name,
	type = 'text',
	validateCallBack,
}: Props) {
	const maxLength = 100
	const [inputValue, setInputValue] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
		if (validateCallBack) {
			validateCallBack(e.target.value)
		}
	}

	const isHintOnly = () => {
		return !hint && characterCount && 'justify-end'
	}

	const getLableStyle = () => {
		return large ? 'text-base leading-7' : 'text-sm leading-5'
	}

	const getInputStyle = () => {
		const height = large && 'h-14'
		const err = error ? 'border-red-A400' : 'border-gray-500'
		const borderAndBg =
			filled ? 'rounded-t-[4px] bg-gray-200 border-b' : ' rounded-[4px] border'

		return `${height} ${borderAndBg} ${err}`
	}

	const getTextColor = () => {
		return error ? 'text-red-A400' : 'text-gray-700'
	}

	const isPassword = () => {
		return type === 'password' ? 'true' : 'false'
	}

	return (
		<article className='flex flex-col gap-y-2'>
			<h2 className={`font-normal ${getLableStyle()}`}>
				{label}
				{required && <span className='text-red-500'>*</span>}
			</h2>
			<input
				type={type}
				name={name}
				autoComplete={isPassword()}
				className={`px-3 py-2 text-gray-700 outline-none text-base leading-6 ${getInputStyle()}`}
				onChange={handleChange}
			/>
			<div className={`px-3 flex ${isHintOnly()}`}>
				{hint && (
					<span
						className={`text-sm font-normal leading-5 flex-1 ${getTextColor()}`}
					>
						{hint}
					</span>
				)}
				{characterCount && (
					<span
						className={`pl-3 text-sm font-normal leading-5 ${getTextColor()}`}
					>
						{inputValue.length}/{maxLength}
					</span>
				)}
			</div>
		</article>
	)
}
