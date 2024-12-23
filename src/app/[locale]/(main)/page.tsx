'use client'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@state/store'

export default function Home() {
	const accessToken = useSelector((state: RootState) => state.auth.accessToken)

	const handleClick = () => {
		
		const apiUrl = process.env.NEXT_PUBLIC_API_URL
		axios
			.post(`${apiUrl}/auth/refresh`, {}, {
				withCredentials: true,
				headers: { Authorization: accessToken },
			})
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<>
			<h1>Hello world</h1>
			<button onClick={handleClick}>Click</button>
		</>
	)
}
