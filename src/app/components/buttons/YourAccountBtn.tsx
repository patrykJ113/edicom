'use client'

import React, { useState, useRef, useEffect } from 'react'
import DropDown from '@components/DropDown'
import { useTranslations } from 'next-intl'
import nameSpaces from '@i18n/nameSpace'
import keys from '@i18n/messages'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@state/store'
import { DropDownOption } from '@typings/dropDownOption'

type Props = {
	label: string
}

export default function YourAccountBtn({ label }: Props) {
	const t = useTranslations(nameSpaces.yourAccountBtn)
	const [opened, setOpened] = useState(false)
	const btnRef = useRef<HTMLDivElement | null>(null)
	const { yourAccountBtn } = keys

	const baseApiUrl = process.env.NEXT_PUBLIC_API_URL
	const accessToken = useSelector((state: RootState) => state.auth.accessToken)

	const options = Object.values(yourAccountBtn.options).map(val => {
		const option: DropDownOption = {
			label: t(val),
			cb: null,
		}

		if (t(val) === 'Log Out') {
			option.cb = () => {
				axios
					.post(
						`${baseApiUrl}/auth/logout`,
						{},
						{
							withCredentials: true,
							headers: {
								Authorization: `Bearer ${accessToken}`,
							},
						},
					)
					.then(() => {
						if (typeof window !== 'undefined') {
							window.location.reload()
						}
					})
					.catch(err => {
						// eslint-disable-next-line no-console
						console.log(err)
					})
			}
		}

		return option
	})

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
				{label}
			</button>
			<DropDown options={options} opened={opened} />
		</div>
	)
}
