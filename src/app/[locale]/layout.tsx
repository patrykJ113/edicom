import type { Metadata } from 'next'
import '../globals.css'
import { Roboto } from 'next/font/google'
import Navigation from '../components/Navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export const metadata: Metadata = {
	title: 'Edicom',
	description: 'Ecomarce site',
}

export const roboto = Roboto({
	subsets: ['latin'],
	display: 'swap',
	weight: ['100', '300', '400', '400', '500', '700', '900'],
})

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const messages = await getMessages()
	return (
		<html lang='en'>
			<body className={`${roboto.className} bg-page`}>
				<NextIntlClientProvider messages={messages}>
					<Navigation isLoggedIn={true} />
					<main className='grid-layout relative mt-16'>{children}</main>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
