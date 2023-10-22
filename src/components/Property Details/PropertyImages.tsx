import Image from 'next/image';

const PropertyImages = () => {
	return (
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
				<div className='flex'>
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
						src='/demo4.png'
						alt=''
						width={400}
						height={400}
						className='object-cover aspect-square'
					/>
				</div>
				<div className='flex'>
					<Image
						src='/demo5.png'
						alt=''
						width={400}
						height={400}
						className='object-cover aspect-square'
					/>
				</div>
			</div>
		</section>
	);
};

export default PropertyImages;
