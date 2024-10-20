type Props = {
	children: JSX.Element
}

export default function OAuthButton({ children }: Props) {
	return (
		<button
			type='button'
			className='felx justify-center items-center p-2 rounded-full border border-gray-300
				hover:border-brand transition-all duration-150 hover:shadow-blue-1'
		>
			{children}
		</button>
	)
}
