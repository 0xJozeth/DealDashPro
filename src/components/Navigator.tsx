import { faHeart, faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const propImages = [
	{
		name: 'prop1',
		props: {
			src: '/prop1.png',
			id: 12913781,
			width: 350,
			height: 115,
			alt: 'property',
			className: 'object-cover aspect-square max-h-[115px]',
			arv: '$325,000',
			price: '$273,000',
			location: 'Duval County, Jacksonville, FL',
			beds: '3',
			baths: '2',
			sqft: '1800',
		},
	},
	{
		name: 'prop2',
		props: {
			src: '/prop2.png',
			id: 12913781,
			width: 350,
			height: 115,
			alt: 'property',
			className: 'object-cover aspect-square max-h-[115px]',
			arv: '$325,000',
			price: '$273,000',
			location: 'Duval County, Jacksonville, FL',
			beds: '3',
			baths: '2',
			sqft: '1800',
		},
	},
	{
		name: 'prop3',
		props: {
			src: '/prop3.png',
			id: 12913781,
			width: 350,
			height: 115,
			alt: 'property',
			className: 'object-cover aspect-square max-h-[115px]',
			arv: '$325,000',
			price: '$273,000',
			location: 'Duval County, Jacksonville, FL',
			beds: '3',
			baths: '2',
			sqft: '1800',
		},
	},
	{
		name: 'prop4',
		props: {
			src: '/prop4.png',
			id: 12913781,
			width: 350,
			height: 115,
			alt: 'property',
			className: 'object-cover aspect-square max-h-[115px]',
			arv: '$325,000',
			price: '$273,000',
			location: 'Duval County, Jacksonville, FL',
			beds: '3',
			baths: '2',
			sqft: '1800',
		},
	},
	{
		name: 'prop5',
		props: {
			src: '/prop5.png',
			id: 12913781,
			width: 350,
			height: 115,
			alt: 'property',
			className: 'object-cover aspect-square max-h-[115px]',
			arv: '$325,000',
			price: '$273,000',
			location: 'Duval County, Jacksonville, FL',
			beds: '3',
			baths: '2',
			sqft: '1800',
		},
	},
	{
		name: 'prop6',
		props: {
			src: '/prop6.png',
			id: 12913781,
			width: 350,
			height: 115,
			alt: 'property',
			className: 'object-cover aspect-square max-h-[115px]',
			arv: '$325,000',
			price: '$273,000',
			location: 'Duval County, Jacksonville, FL',
			beds: '3',
			baths: '2',
			sqft: '1800',
		},
	},
	{
		name: 'prop1',
		props: {
			src: '/prop1.png',
			id: 12913781,
			width: 350,
			height: 115,
			alt: 'property',
			className: 'object-cover aspect-square max-h-[115px]',
			arv: '$325,000',
			price: '$273,000',
			location: 'Duval County, Jacksonville, FL',
			beds: '3',
			baths: '2',
			sqft: '1800',
		},
	},
	{
		name: 'prop2',
		props: {
			src: '/prop2.png',
			id: 12913781,
			width: 350,
			height: 115,
			alt: 'property',
			className: 'object-cover aspect-square max-h-[115px]',
			arv: '$325,000',
			price: '$273,000',
			location: 'Duval County, Jacksonville, FL',
			beds: '3',
			baths: '2',
			sqft: '1800',
		},
	},
	{
		name: 'prop3',
		props: {
			src: '/prop3.png',
			id: 12913781,
			width: 350,
			height: 115,
			alt: 'property',
			className: 'object-cover aspect-square max-h-[115px]',
			arv: '$325,000',
			price: '$273,000',
			location: 'Duval County, Jacksonville, FL',
			beds: '3',
			baths: '2',
			sqft: '1800',
		},
	},
	{
		name: 'prop4',
		props: {
			src: '/prop4.png',
			id: 12913781,
			width: 350,
			height: 115,
			alt: 'property',
			className: 'object-cover aspect-square max-h-[115px]',
			arv: '$325,000',
			price: '$273,000',
			location: 'Duval County, Jacksonville, FL',
			beds: '3',
			baths: '2',
			sqft: '1800',
		},
	},
	{
		name: 'prop5',
		props: {
			src: '/prop5.png',
			id: 12913781,
			width: 350,
			height: 115,
			alt: 'property',
			className: 'object-cover aspect-square max-h-[115px]',
			arv: '$325,000',
			price: '$273,000',
			location: 'Duval County, Jacksonville, FL',
			beds: '3',
			baths: '2',
			sqft: '1800',
		},
	},
	{
		name: 'prop6',
		props: {
			src: '/prop6.png',
			id: 12913781,
			width: 350,
			height: 115,
			alt: 'property',
			className: 'object-cover aspect-square max-h-[115px]',
			arv: '$325,000',
			price: '$273,000',
			location: 'Duval County, Jacksonville, FL',
			beds: '3',
			baths: '2',
			sqft: '1800',
		},
	},
	// Add more items to the propImages array if needed
];

function Navigator() {
	return (
		<div className='fixed top-[15%] right-16 flex justify-center items-center z-[9999]'>
			<div className='m-8 p-8 w-[600px] h-[800px] min-w-[300px] rounded-[10px] bg-slate-50 z-[100] shadow-xl'>
				<form className='flex justify-between items-center w-full gap-x-2 p-2 pl-4 mb-4 rounded-full border neutral-500 bg-white'>
					<input
						type='text'
						placeholder='Search by City or State'
						className='w-1/2  border-r border-neutral-200 text-neutral-500 text-base-font-normal leading-normal focus:outline-none'
					/>
					<input
						type='number'
						placeholder='Price'
						className='text-base-font-normal leading-normal focus:outline-none'
					/>
					<button type='submit' title='Search'>
						<Image
							src='/search1.svg'
							width={32}
							height={32}
							alt='search'
							className='flex justify-center items-center'
						/>
					</button>
				</form>
				<div className='grid grid-cols-2 gap-4 overflow-y-scroll max-h-[90%] scrollbar-hide !scroll-smooth'>
					{propImages.map((item, index) => (
						<div
							key={index}
							className='relative rounded-t-[10px] overflow-hidden'
						>
							{' '}
							{/* TODO: Add  */}
							<FontAwesomeIcon
								icon={faHeart}
								className='absolute top-4 right-4 text-white cursor-pointer shadow-lg'
							/>
							<Link href={`/property-details/${item.props.id}`}>
								<Image
									src={item.props.src}
									width={item.props.width}
									height={item.props.height}
									alt={item.props.alt}
									className={item.props.className}
								/>
								<div className='flex flex-col p-4 border border-zinc-300 rounded-b-[10px] gap-2'>
									<div className='flex justify-between items-center'>
										<p className='text-zinc-950 text-sm font-normal leading-[14px]'>
											{item.props.price}
										</p>
										<div className='flex justify-between items-center gap-[2px]'>
											<p className='text-neutral-500 text-xs font-normal leading-[14px]'>
												ARV:{' '}
											</p>
											<p className='text-neutral-500 text-xs font-normal leading-[14px]'>
												{item.props.arv}
											</p>
										</div>
									</div>
									<div className='flex justify-start items-center'>
										<p className='text-zinc-950 text-sm font-normal leading-[14px] whitespace-nowrap'>
											{item.props.location}
										</p>
									</div>
									<div className='flex justify-start items-center gap-2'>
										<div className='flex justify-between items-center gap-[2px]'>
											<p className='text-neutral-500 text-xs font-normal leading-[14px]'>
												{item.props.beds}
											</p>
											<p className='text-neutral-500 text-xs font-normal leading-[14px]'>
												bds
											</p>
										</div>
										<div className='flex justify-between items-center gap-[2px]'>
											<p className='text-neutral-500 text-xs font-normal leading-[14px]'>
												{item.props.baths}
											</p>
											<p className='text-neutral-500 text-xs font-normal leading-[14px]'>
												ba
											</p>
										</div>
										<div className='flex justify-between items-center gap-[2px]'>
											<p className='text-neutral-500 text-xs font-normal leading-[14px]'>
												{item.props.sqft}
											</p>
											<p className='text-neutral-500 text-xs font-normal leading-[14px]'>
												sqft
											</p>
										</div>
									</div>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Navigator;
