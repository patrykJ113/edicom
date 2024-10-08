import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Edicom',
	description: 'Ecomarce site',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body>
				<main className='grid-layout'>{children}</main>
			</body>
		</html>
	)
}
