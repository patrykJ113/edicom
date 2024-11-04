export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <main className='grid-layout h-screen items-center auth-bg'>{children}</main>
}
