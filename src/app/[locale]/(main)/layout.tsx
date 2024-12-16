import Navigation from '@components/navigation/Navigation'

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Navigation />
			<main className='grid-layout relative mt-16'>{children}</main>
		</>
	)
}
