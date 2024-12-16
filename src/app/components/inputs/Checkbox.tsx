type Props = {
	children: string
	checked?: boolean
}

export default function Checkbox({ children, checked }: Props) {
	return (
		<label className='grid-cols-1em-auto hover:cursor-pointer grid gap-x-1 items-center select-none'>
			<input
				type='checkbox'
				name='remember-me'
				onChange={() => {}}
				checked={checked}
				className='appearance-none text-white h-[1em] w-[1em] rounded-sm border border-brand-100
					checked:border-brand checked:bg-brand
					checked:bg-[url("/svg/check.svg")] checked:bg-center
					checked:bg-no-repeat checked:bg-contain'
			/>
			<span className="font-semibold text-sm leading-5">{children}</span>
		</label>
	)
}
