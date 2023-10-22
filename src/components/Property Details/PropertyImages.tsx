import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
const PropertyImages = () => {
	return (
		<section className='relative flex gap-1 my-2 w-full rounded-[10px] overflow-hidden'>
			{/* Featured Property Image */}
			<Link href='#'>
				<div className='flex relative min-w-[50%]'>
					<Image
						src='/demo1.png'
						alt=''
						width={800}
						height={800}
						className='object-cover aspect-square hover:scale-95 transition-all duration-30'
					/>
					<div className='absolute inset-0 bg-zinc-700 opacity-0 hover:opacity-20 transition-all duration-300'></div>
				</div>
			</Link>

			{/* Gallery of Property Images */}
			<div className='grid grid-cols-2 gap-1 w-auto h-auto'>
				<div className='flex relative'>
					<Link href='#'>
						<Image
							src='/demo2.png'
							alt=''
							width={400}
							height={400}
							className='object-cover aspect-square hover:scale-95 transition-all duration-30'
						/>
						<div className='absolute inset-0 bg-zinc-700 opacity-0 hover:opacity-20 transition-all duration-300'></div>
					</Link>
				</div>

				<div className='flex relative'>
					<Link href='#'>
						<Image
							src='/demo3.png'
							alt=''
							width={400}
							height={400}
							className='object-cover aspect-square hover:scale-95 transition-all duration-30'
						/>
						<div className='absolute inset-0 bg-zinc-700 opacity-0 hover:opacity-20 transition-all duration-300'></div>
					</Link>
				</div>

				<Link href='#'>
					<div className='flex relative'>
						<Image
							src='/demo4.png'
							alt=''
							width={400}
							height={400}
							className='object-cover aspect-square hover:scale-95 transition-all duration-30'
						/>
						<div className='absolute inset-0 bg-zinc-700 opacity-0 hover:opacity-20 transition-all duration-300'></div>
					</div>
				</Link>

				<div className='flex relative'>
					<Link href='#'>
						<Image
							src='/demo5.png'
							alt=''
							width={400}
							height={400}
							className='object-cover aspect-square hover:scale-95 transition-all duration-30'
						/>
						<div className='absolute inset-0 bg-zinc-700 opacity-0 hover:opacity-20 transition-all duration-300'></div>
					</Link>

					{/* Show all photos button */}
					<Link href='#'>
						<div
							id='galleryButtonWrapper'
							className='absolute bottom-0 right-0 mr-[19px] mb-[21px] z-[100] group'
						>
							<div
								id='gallerybutton'
								className=' flex justify-center items-center h-7 gap-1  bg-white border border-black rounded-[5px] w-[131px] shadow-lg group-hover:border-[#58A053] group-hover:bg-black  group-hover:text-white transition-all duration-300'
							>
								<FontAwesomeIcon
									icon={faImages}
									className=' group-hover:text-[#58A053]'
								/>
								<p className='text-black group-hover:text-[#58A053] text-xs font-normal leading-tight whitespace-nowrap'>
									Show all photos
								</p>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default PropertyImages;
