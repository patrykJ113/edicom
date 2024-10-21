import { Link } from '@/i18n/routing'
import YoureAccountBtn from '@components/buttons/YoureAccountBtn'
import { useTranslations } from 'next-intl'
import messagesEnum from '@enum/messages'
import nameSpaceEnum from '@enum/name-space'

type Props = {
	isLoggedIn: boolean
}

export default function TopNav({ isLoggedIn }: Props) {
	const { topNav } = messagesEnum
	const t = useTranslations(nameSpaceEnum.topNav)
	return (
		<div className='hidden sm:grid-layout'>
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
								<Link href='/auth?type=signup'>{t(topNav.register)}</Link>
							</li>
							<li className='text-lg font-medium text-brand'>
								<Link href='/auth'>{t(topNav.logIn)}</Link>
							</li>
						</ul>
					:	<div className='flex items-center gap-4 gap-x-6'>
							<YoureAccountBtn />
							<Link href='/' className='text-lg font-medium text-brand'>
								{t(topNav.newListing)}
							</Link>
						</div>
					}
				</section>
			</div>
		</div>
	)
}
