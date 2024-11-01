type Props = {
	children: JSX.Element | string
}

export default function Button({ children }: Props) {
	return (
		<button className='text-base leading-5.5 bg-brand py-2 px-6 rounded-full text-white hover:bg-brand-600 active:bg-brand-700'>
			{children}
		</button>
	)
}
