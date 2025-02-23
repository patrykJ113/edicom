import TopNav from '@components/navigation/TopNav'
import BottomNav from '@components/navigation//BottomNav'

export default function Navigation() {
	return (
		<nav
			className='fixed inset-x-0 bottom-0 sm:top-0 z-50 bg-white shadow-gray-1 sm:shadow-blue-1
				h-fit'
		>
			<TopNav/>
			<BottomNav />
		</nav>
	)
}
