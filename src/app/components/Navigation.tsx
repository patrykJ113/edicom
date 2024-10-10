import Link from 'next/link'
import YoureAccountBtn from './buttons/YoureAccountBtn'

type Props = {
	isLoggedIn: boolean
}

export default function Navigation({ isLoggedIn }: Props) {
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
									<Link href='/'>Register</Link>
								</li>
								<li className='text-lg font-medium text-brand'>
									<Link href='/'>Log in</Link>
								</li>
							</ul>
						:	<div className='flex items-center gap-4 gap-x-6'>
								<YoureAccountBtn />{' '}
								<Link href='/' className='text-lg font-medium text-brand'>
									New Listing
								</Link>
							</div>
						}
					</section>
				</div>
			</div>
		</nav>
	)
}
