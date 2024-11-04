/* eslint-disable @next/next/no-async-client-component */
'use client'

import { useEffect } from "react";


export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	useEffect(() => {
	document.body.classList.add('bg-brand-100')

    return () => {
	document.body.classList.remove('bg-brand-100')

    };
  }, []);
  
	return <main className='grid-layout h-screen items-center'>{children}</main>
}
