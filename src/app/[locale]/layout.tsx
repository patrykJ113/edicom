import type { Metadata } from 'next'
import '../globals.css'
import { Roboto } from 'next/font/google'
import Navigation from '@components/navigation/Navigation'
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
	params: { locale },
}: Readonly<{
	children: React.ReactNode
	params: { locale: string }
}>) {
	const messages = await getMessages()
	return (
		<html lang={locale}>
			<body className={`${roboto.className} bg-page`}>
				<NextIntlClientProvider messages={messages}>
					<Navigation />
					<main className='grid-layout relative mt-16'>{children}</main>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
