'use client'
import { Link } from '@/i18n/routing'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@state/store'

export default function Home() {
	const baseApiUrl = process.env.NEXT_PUBLIC_API_URL
	const accessToken = useSelector((state: RootState) => state.auth.accessToken)

	const handleClick = () => {
		axios.post(`${baseApiUrl}/auth/verify`, {}, {
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})
	}

	return (
		<>
			<Link href='/test'>test</Link>
			<h1>Hello world</h1>
			<button onClick={handleClick}>Verify</button>
		</>
	)
}
