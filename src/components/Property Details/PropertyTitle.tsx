import Link from 'next/link';

const PropertyTitle = () => {
	return (
		<div className='flex flex-col w-full h-auto py-2'>
			<div className='flex items-center py-4 h-[1.8rem]'>
				<h1 className='text-black text-[26px] font-medium leading-[30px]'>
					Quick Flipping Opportunity in Houston, TX🏠
				</h1>
			</div>

			<div className='flex items-center justify-between py-4 h-[.625rem]'>
				<div className='flex items-center gap-16 h-[.625rem]'>
					<p className='text-black text-sm font-normal leading-tight'>
						Duval County, Jacksonville, Florida
					</p>
					<Link
						href='#'
						className='text-black text-sm font-normal underline leading-[18px]'
					>
						View full address
					</Link>
				</div>
				<div className='flex items-center justify-between h-[.625rem]'>
					<p className='text-neutral-500 text-sm font-normal leading-[14px]'>
						Deal Posted: {new Date().toDateString()}
					</p>
				</div>
			</div>
		</div>
	);
};

export default PropertyTitle;
