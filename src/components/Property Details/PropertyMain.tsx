import Link from 'next/link';

const PropertyMain = () => {
	return (
		<section className=' w-full py-4 h-auto'>
			<div id='mainSection' className='flex justify-between w-full gap-4'>
				<div className='flex flex-col w-[708px] h-[2000px]'>
					<div
						id='pricingDetails'
						className='flex flex-col w-full gap-y-2 pb-4 border-b border-b-zinc-300'
					>
						<div className='flex items-center w-full gap-x-4 space-between'>
							<p className='font-semibold text-lg'>$253,000</p>
							<p className='text-xs'>ARV: $375,000</p>
							<p className='text-xs'>
								<span className='font-semibold text-lg'>4</span> Beds
							</p>
							<p className='text-xs'>
								<span className='font-semibold text-lg'>2</span> Baths
							</p>
							<p className='text-xs'>
								<span className='font-semibold text-lg'>2,235</span> Sq Ft
							</p>
						</div>
						<div>
							<Link href='#' className='text-xs font-semibold underline'>
								make an offer
							</Link>
						</div>
					</div>
					<section
						id='aboutThisListing'
						className='flex flex-col w-full py-2 gap-y-4'
					>
						<h2 className='text-lg font-semibold'>About this listing</h2>
						{/* TODO: add show more button logic */}
						<p className='text-sm'>
							lorem ipsum dolor sit amet consectetur adipiscing elit sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim
							ad minim veniam quis nostrud exercitation ullamco laboris nisi ut
							aliquip ex ea commodo consequat. lorem ipsum dolor sit amet
							consectetur adipiscing elit sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua ut enim ad minim veniam quis nostrud
							exercitation ullamco laboris nisi ut aliquip ex ea commodo
							consequat. lorem ipsum dolor sit amet consectetur adipiscing elit
							sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
							ut enim ad minim veniam quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat.{' '}
						</p>
						<div>
							<Link href='#' className='text-xs font-semibold underline'>
								View More
							</Link>
						</div>
					</section>
					<section id='details' className='flex flex-col w-full py-2 gap-y-4'>
						<h3 className='text-sm font-semibold'>Details</h3>
						<div
							id='detailsColumnsWrapper'
							className='flex w-full space-between bg-red-300'
						>
							<div>Left</div>
							<div>Right</div>
						</div>
					</section>
				</div>

				{/* TODO: add right section */}
				<div className='flex flex-col w-[300px] h-[300px] bg-green-200'>
					Right Section
				</div>
			</div>
		</section>
	);
};

export default PropertyMain;
