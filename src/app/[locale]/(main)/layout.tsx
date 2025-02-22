'use client'
import Navigation from '@components/navigation/Navigation'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setToken } from '@state/token/slice'
import { setUser } from '@state/user/slice'
import { jwtDecode } from 'jwt-decode'
import { RootState } from '@state/store'
import axios from 'axios'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const accessToken = useSelector((state: RootState) => state.auth.accessToken)
	const dispatch = useDispatch()

	useEffect(() => {
		if (accessToken) return

		const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL

		axios
			.post(
				`${apiBaseUrl}/auth/refresh`,
				{},
				{
					withCredentials: true,
				},
			)
			.then(res => {
				const bearerToken = res.headers.authorization
				const newAccessToken = bearerToken.slice(7)
				const decoded: { name: string; sub: string; email: string } =
					jwtDecode(newAccessToken)
				dispatch(
					setUser({
						id: decoded.sub,
						name: decoded.name,
						email: decoded.email,
					}),
				)
				dispatch(setToken(newAccessToken))
			})
			.catch(err => {
				// eslint-disable-next-line no-console
				console.log(err)
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Navigation />
			<main className='grid-layout relative mt-16'>{children}</main>
		</>
	)
}
