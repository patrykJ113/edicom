import { Link } from '@/i18n/routing'
import TopNavActions from '@components/navigation/TopNavActions'

export default function TopNav() {
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
					<TopNavActions />
				</section>
			</div>
		</div>
	)
}
