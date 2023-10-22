import Image from 'next/image';
import Link from 'next/link';

const PropertyCards = () => {
	return (
		<section
			id='media'
			className='flex flex-col w-full py-[24px] gap-4 border-t border-neutral-200'
		>
			<h3 className='text-[22px] font-semibold leading-relaxed'>
				More Properties from Company Name
			</h3>
			{/* TODO: Mapping. */}
			<div
				id='cardOuterWrapper'
				className='flex w-full justify-between items-center gap-4'
			>
				<Link href={'#'}>
					<div
						id='cardImageWrapper'
						className='flex flex-col h-[215px] rounded-t-[10px] overflow-hidden'
					>
						<Image
							src={'/cardProperty1.png'}
							width={253}
							height={128}
							alt={'logo'}
							className='object-cover aspect-square relative -top-12'
						/>
						<div
							id='cardDetailsWrapper'
							className='flex flex-col h-full p-2 bg-white border border-zinc-300 rounded-b-[10px] relative -top-32'
						>
							<div className='flex justify-between'>
								<p>$219,000</p>
								<p>ARV $325,000</p>
							</div>
							<div className=''>
								<p>Duval County, Jacksonville</p>
							</div>
							<div className=''>
								<p>3 bds | 2 ba | 2,2245 sqft</p>
							</div>
						</div>
					</div>
				</Link>
				<Link href={'#'}>
					<div
						id='cardImageWrapper'
						className='flex flex-col h-[215px] rounded-t-[10px] overflow-hidden'
					>
						<Image
							src={'/cardProperty1.png'}
							width={253}
							height={128}
							alt={'logo'}
							className='object-cover aspect-square relative -top-12'
						/>
						<div
							id='cardDetailsWrapper'
							className='flex flex-col h-full p-2 bg-white border border-zinc-300 rounded-b-[10px] relative -top-32'
						>
							<div className='flex justify-between'>
								<p>$219,000</p>
								<p>ARV $325,000</p>
							</div>
							<div className=''>
								<p>Duval County, Jacksonville</p>
							</div>
							<div className=''>
								<p>3 bds | 2 ba | 2,2245 sqft</p>
							</div>
						</div>
					</div>
				</Link>
				<Link href={'#'}>
					<div
						id='cardImageWrapper'
						className='flex flex-col h-[215px] rounded-t-[10px] overflow-hidden'
					>
						<Image
							src={'/cardProperty1.png'}
							width={253}
							height={128}
							alt={'logo'}
							className='object-cover aspect-square relative -top-12'
						/>
						<div
							id='cardDetailsWrapper'
							className='flex flex-col h-full p-2 bg-white border border-zinc-300 rounded-b-[10px] relative -top-32'
						>
							<div className='flex justify-between'>
								<p>$219,000</p>
								<p>ARV $325,000</p>
							</div>
							<div className=''>
								<p>Duval County, Jacksonville</p>
							</div>
							<div className=''>
								<p>3 bds | 2 ba | 2,2245 sqft</p>
							</div>
						</div>
					</div>
				</Link>
				<Link href={'#'}>
					<div
						id='cardImageWrapper'
						className='flex flex-col h-[215px] rounded-t-[10px] overflow-hidden'
					>
						<Image
							src={'/cardProperty1.png'}
							width={253}
							height={128}
							alt={'logo'}
							className='object-cover aspect-square relative -top-12'
						/>
						<div
							id='cardDetailsWrapper'
							className='flex flex-col h-full p-2 bg-white border border-zinc-300 rounded-b-[10px] relative -top-32'
						>
							<div className='flex justify-between'>
								<p>$219,000</p>
								<p>ARV $325,000</p>
							</div>
							<div className=''>
								<p>Duval County, Jacksonville</p>
							</div>
							<div className=''>
								<p>3 bds | 2 ba | 2,2245 sqft</p>
							</div>
						</div>
					</div>
				</Link>
			</div>
			<div className='flex justify-center items-center py-4'>
				<Link href='#'>
					<div className='flex justify-center items-center w-[250px] min-w-[175px] h-[45px] rounded-[5px] border border-black'>
						<p className='text-black text-base font-normal leading-normal'>
							View more homes
						</p>
					</div>
				</Link>
			</div>
		</section>
	);
};

export default PropertyCards;
