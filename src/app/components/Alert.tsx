import CircleError from '@svg/circle-error.svg'

type Props = {
	children: JSX.Element | string
}

export default function Alert({ children }: Props) {
	return (
		<article className='border-l-red-900 border-l-2 flex gap-3 px-5 py-4 bg-red-50 items-center'>
			<CircleError className='fill-red-900 h-6 w-6' />
			<p className='text-sm leading-5 text-red-900 flex-1'>{children}</p>
		</article>
	)
}
