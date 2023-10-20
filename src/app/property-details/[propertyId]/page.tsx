import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Image from 'next/image';

const PropertyDetailsPage = () => {
	return (
		<MaxWidthWrapper>
			<div className='flex flex-col w-full h-auto py-2'>
				<div className='flex items-center py-4 h-[1.8rem]'>
					<h1 className='font-semibold text-xl'>
						Quick Flipping Opportunity in Houston, TX🏠
					</h1>
				</div>
				<div className='flex items-center justify-between py-4 h-[.625rem]'>
					<p>Quick Flipping Opportunity in Houston, TX🏠</p>
					<p>View full address</p>
					<p>Deal Posted: {new Date().toDateString()}</p>
				</div>
			</div>
			<section className='relative flex gap-1 my-2 w-full rounded-[10px] overflow-hidden'>
				<div className='flex min-w-[50%]'>
					<Image
						src='/demo1.png'
						alt=''
						width={800}
						height={800}
						className='object-cover'
					/>
				</div>
				<div className='grid grid-cols-2 gap-1 w-auto h-auto'>
					<div className='flex'>
						<Image
							src='/demo2.png'
							alt=''
							width={400}
							height={400}
							className='object-cover aspect-square'
						/>
					</div>
					<div className='flex '>
						<Image
							src='/demo3.png'
							alt=''
							width={400}
							height={400}
							className='object-cover aspect-square'
						/>
					</div>
					<div className='flex'>
						<Image
							src='/demo1.png'
							alt=''
							width={400}
							height={400}
							className='object-cover aspect-square'
						/>
					</div>
					<div className='flex'>
						<Image
							src='/demo1.png'
							alt=''
							width={400}
							height={400}
							className='object-cover aspect-square'
						/>
					</div>
				</div>
			</section>
		</MaxWidthWrapper>
	);
};

export default PropertyDetailsPage;
