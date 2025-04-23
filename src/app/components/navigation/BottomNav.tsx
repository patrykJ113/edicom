'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import nameSpaces from '@i18n/nameSpace'

import Home from '@svg/home.svg'
import HomeFiled from '@svg/home-filed.svg'
import Heart from '@svg/heart.svg'
import HeartField from '@svg/heart-filed.svg'
import Add from '@svg/add.svg'
import AddFiled from '@svg/add-filed.svg'
import Message from '@svg/messages.svg'
import MessageField from '@svg/messages-filed.svg'
import User from '@svg/user.svg'
import UserField from '@svg/user-filed.svg'

type IconKeys = 'search' | 'favorites' | 'add' | 'messages' | 'account'

type Icons = Record<IconKeys, { active: JSX.Element; inactive: JSX.Element }>

export default function BottomNav() {
	const [activeButton, setActiveButton] = useState<IconKeys | null>(null)
	const t = useTranslations(nameSpaces.bottomNav)

	const icons: Icons = {
		search: {
			active: <HomeFiled className='h-7 w-7 fill-brand' />,
			inactive: <Home className='h-7 w-7 fill-gray-800' />,
		},
		favorites: {
			active: <HeartField className='h-7 w-7 fill-brand' />,
			inactive: <Heart className='h-7 w-7 fill-gray-800' />,
		},
		add: {
			active: <AddFiled className='h-7 w-7 fill-brand' />,
			inactive: <Add className='h-7 w-7 fill-gray-800' />,
		},
		messages: {
			active: <MessageField className='h-7 w-7 fill-brand' />,
			inactive: <Message className='h-7 w-7 fill-gray-800' />,
		},
		account: {
			active: <UserField className='h-7 w-7 fill-brand' />,
			inactive: <User className='h-7 w-7 fill-gray-800' />,
		},
	}

	const handleClick = (button: IconKeys) => {
		setActiveButton(prev => (prev === button ? null : button))
	}

	return (
		<div className='sm:hidden mx-4 grid grid-cols-4 gap-x-4'>
			<ul className='flex justify-between col-span-full'>
				{Object.keys(icons).map(icon => {
					const key = icon as IconKeys
					return (
						<li
							className='pt-3 pb-4 hover:cursor-pointer'
							key={key}
							onClick={() => handleClick(key)}
						>
							<div className='flex flex-col text-xs leading-6 w-full min-w-14 max-w-16 items-center'>
								{activeButton === key ? icons[key].active : icons[key].inactive}
								<span
									className={`${activeButton === key ? 'text-brand' : 'text-gray-800'}`}
								>
									{t(key)}
								</span>
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
