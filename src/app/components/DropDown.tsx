import { DropDownOption } from "@typings/dropDownOption"

type Props = {
	options: DropDownOption[]
	opened: boolean
}

export default function DropDown({ options, opened }: Props) {
	return (
		<article
			className={`${!opened && 'opacity-0 -translate-y-5'}
				${!opened ? 'pointer-events-none' : 'pointer-events-auto'} transition-all
				duration-300 w-max rounded bg-white py-2 shadow-blue-2 absolute top-full
				right-1/2 translate-x-1/2 border border-gray-200`}
		>
			<ul className='relative triangle'>
				{options.map(option => (
					<li
						className={`${!opened && 'opacity-0'} duration-300 transition-all min-w-48 p-2 text-sm
						text-gray-400 hover:cursor-pointer hover:bg-brand-100 hover:text-brand-900
						active:bg-brand-200`}
						onClick={option.cb ?? undefined}
						key={option.label}
					>
						{option.label}
					</li>
				))}
			</ul>
		</article>
	)
}
