import Link from 'next/link'
import YoureAccountBtn from './buttons/YoureAccountBtn'
import { useTranslations } from 'next-intl'
import messagesEnum from '../enum/messages'
import nameSpaceEnum from '../enum/name-space'

type Props = {
	isLoggedIn: boolean
}

export default function Navigation({ isLoggedIn }: Props) {
	const { navigation } = messagesEnum
	const t = useTranslations(nameSpaceEnum.navigation)

	return (
		<nav className='fixed inset-x-0 top-0 z-50 bg-white shadow-blue-1'>
			<div className='grid-layout'>
				<div className='col-span-full flex items-center justify-between'>
					<h1>
						<Link href='/'>
							<span className='text-4.5xl'>Edi</span>
							<span className='text-4.5xl text-gray-500'>com</span>
						</Link>
					</h1>
					<section>
						{!isLoggedIn ?
							<ul className='flex items-center gap-4 gap-x-6'>
								<li className='text-base font-medium text-gray-300'>
									<Link href='/'>{t(navigation.register)}</Link>
								</li>
								<li className='text-lg font-medium text-brand'>
									<Link href='/'>{t(navigation.logIn)}</Link>
								</li>
							</ul>
						:	<div className='flex items-center gap-4 gap-x-6'>
								<YoureAccountBtn />
								<Link href='/' className='text-lg font-medium text-brand'>
									{t(navigation.newListing)}
								</Link>
							</div>
						}
					</section>
				</div>
			</div>
		</nav>
	)
}
