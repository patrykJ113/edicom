export default function Spinner() {
	return (
		<div className='absolute inset-0 bg-page flex justify-center items-center'>
			<div className='w-12 h-12 rounded-full relative animate-spinnerRotate'>
				<div className='absolute inset-0 border-[5px] rounded-full animate-spinnerClipFix border-brand'></div>
			</div>
		</div>
	)
}
