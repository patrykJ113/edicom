'use client'

import { useState } from 'react'

type Props = {
	label: string
	large?: boolean
	required?: boolean
	hint?: string
	characterCount?: boolean
	filled?: boolean
	name: string
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
	// icon: boolean !!! maybe add in the feature
}

export default function Input({
	label,
	required,
	large,
	characterCount,
	hint,
	filled,
	name,
	type = 'text'
}: Props) {
	const maxLength = 100
	const [inputValue, setInputValue] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const isHintOnly = () => {
		return !hint && characterCount && 'justify-end'
	}

	const getLableStyle = () => {
		return large ? 'text-base leading-7' : 'text-sm leading-5'
	}

	const getInputStyle = () => {
		const height = large && 'h-14'
		const borderAndBg =
			filled ? 'rounded-t-[4px] bg-gray-200 border-b' : ' rounded-[4px] border'

		return `${height} ${borderAndBg}`
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
				className={`px-3 py-2 text-gray-700 outline-none border-gray-500 text-base leading-6
					${getInputStyle()}`}
				onChange={handleChange}
			/>
			<div className={`px-3 flex ${isHintOnly()}`}>
				{hint && (
					<span className='text-sm font-normal leading-5 flex-1 text-gray-700'>
						{hint}
					</span>
				)}
				{characterCount && (
					<span className='pl-3 text-sm font-normal leading-5 text-gray-700'>
						{inputValue.length}/{maxLength}
					</span>
				)}
			</div>
		</article>
	)
}
