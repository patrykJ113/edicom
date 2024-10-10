import type { Metadata } from 'next'
import './globals.css'
import { Roboto } from 'next/font/google'
import Navigation from './components/Navigation'

export const metadata: Metadata = {
	title: 'Edicom',
	description: 'Ecomarce site',
}

export const roboto = Roboto({
	subsets: ['latin'],
	display: 'swap',
	weight: ['100', '300', '400', '400', '500', '700', '900'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${roboto.className} bg-page`}>
				<Navigation isLoggedIn={true}/>
				<main className='grid-layout relative mt-16'>{children}</main>
			</body>
		</html>
	)
}
