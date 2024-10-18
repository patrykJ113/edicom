type Props = {
	children: JSX.Element | string
}

export default function Button({ children }: Props) {
	return (
		<button className='text-base leading-5.5 bg-brand py-4 px-6 rounded-full text-white'>
			{children}
		</button>
	)
}
