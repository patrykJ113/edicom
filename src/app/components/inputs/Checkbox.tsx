type Props = {
	children: JSX.Element | string
}

export default function Checkbox({ children }: Props) {
	return (
		<label className='grid-cols-1em-auto hover:cursor-pointer grid gap-x-1 items-center select-none'>
			<input
				type='checkbox'
				name='remember-me'
				className='appearance-none text-white h-[1em] w-[1em] rounded-sm border border-brand-100
					checked:border-brand checked:bg-brand
					checked:bg-[url("../assets/svg/check.svg")] checked:bg-center
					checked:bg-no-repeat checked:bg-contain'
			/>
			{children}
		</label>
	)
}
