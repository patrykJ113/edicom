import type { Metadata } from 'next'
import './globals.css'
import { Roboto } from 'next/font/google'

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
			<body className={roboto.className}>
				<main className='grid-layout'>{children}</main>
			</body>
		</html>
	)
}
