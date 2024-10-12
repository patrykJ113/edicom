'use client'

import React, { useState, useRef, useEffect } from 'react'
import DropDown from '../DropDown'
import { useTranslations } from 'next-intl'
import nameSpaceEnum from '@/app/enum/name-space'
import messagesEnum from '@/app/enum/messages'

export default function YoureAccountBtn() {
	const t = useTranslations(nameSpaceEnum.youreAccountBtn)
	const [opened, setOpened] = useState(false)
	const btnRef = useRef<HTMLDivElement | null>(null)
	const { youreAccountBtn } = messagesEnum

	const options = Object.values(youreAccountBtn.options).map(val => t(val))

	const handleClickOutside = (event: Event) => {
		const target = event.target as Node

		if (btnRef.current && !btnRef.current.contains(target)) {
			setOpened(false)
		}
	}

	const handleScroll = () => {
		setOpened(false)
	}

	useEffect(() => {
		if (opened) {
			document.addEventListener('mousedown', handleClickOutside)
			window.addEventListener('scroll', handleScroll)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			window.removeEventListener('scroll', handleScroll)
		}
	}, [opened])

	const toggleDropDown = () => {
		setOpened(!opened)
	}

	return (
		<div className='flex flex-col items-center relative' ref={btnRef}>
			<button
				className='text-base text-gray-500 py-3 hover:text-gray-700 active:text-gray-900'
				onClick={toggleDropDown}
			>
				{t('btnLabel')}
			</button>
			<DropDown options={options} opened={opened} />
		</div>
	)
}
