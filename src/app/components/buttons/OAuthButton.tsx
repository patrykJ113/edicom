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
			className='flex justify-center items-center p-2 border-b-2 border-b-transparent
				transition-colors duration-150 hover:border-b-brand'
		>
			{apple && <Apple className='h-7 w-7' />}
			{google && <Google className='h-7 w-7' />}
			{fb && <Fb className='h-7 w-7' />}
		</button>
	)
}
