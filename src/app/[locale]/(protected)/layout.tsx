'use client'
import Navigation from '@components/navigation/Navigation'
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setToken } from '@state/token/slice'
import { setUser } from '@state/user/slice'
import { jwtDecode } from 'jwt-decode'
import { RootState } from '@state/store'
import axios from 'axios'
import { useRouter } from '@/i18n/routing'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const accessToken = useSelector((state: RootState) => state.auth.accessToken)
	const dispatch = useDispatch()
	const hasRun = useRef(false)
	const router = useRouter()

	useEffect(() => {
		if (hasRun.current) return

		hasRun.current = true
		const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL

		axios
			.post(
				`${apiBaseUrl}/auth/verify`,
				{},
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				},
			)
			.then(res => {
				const bearerToken = res.headers.authorization

				if (!bearerToken) return

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
			.catch(() => {
				router.push('auth/login')
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
