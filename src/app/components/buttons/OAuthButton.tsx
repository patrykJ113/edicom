import Google from '@svg/logos/google.svg'
import Fb from '@svg/logos/fb.svg'
import Apple from '@svg/logos/apple.svg'

type Props = {
	google?: boolean
	fb?: boolean
	apple?: boolean
}

export default function OAuthButton({ google, apple, fb }: Props) {
	return (
		<button
			type='button'
			className='flex justify-center items-center p-2 rounded-full border border-gray-300
				hover:border-brand transition-all duration-150 hover:shadow-blue-1'
		>
			{apple && <Apple />}
			{google && <Google />}
			{fb && <Fb />}
		</button>
	)
}
