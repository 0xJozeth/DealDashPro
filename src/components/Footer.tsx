import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import Image from 'next/image';

const Footer = () => {
	return (
		<div className='flex w-full justify-center items-center h-[184px] bg-gray-200'>
			<MaxWidthWrapper>
				<div
					id='footerOuterWrapper'
					className='flex flex-col w-full items-center gap-4 py-4'
				>
					<div
						id='footerInnerWrapper'
						className='flex w-full justify-between items-center border-b border-neutral-500'
					>
						<Link href='/'>
							<Image
								src={'/ddpBlack.svg'}
								width={225}
								height={35}
								alt={'logo'}
								className='p-2'
							/>
						</Link>

						<Link href='#' id='legalese'>
							<div className='flex w-[219px] justify-between items-center'>
								<p className='text-black text-sm font-normal leading-[14px]'>
									Privacy Policy
								</p>
								<p className='text-black text-sm font-normal leading-[14px]'>
									{' '}
									{' • '}{' '}
								</p>
								<p className='text-black text-sm font-normal leading-[14px]'>
									Terms of service
								</p>
							</div>
						</Link>

						<Link href='#' id='contact'>
							<div className='flex w-[219px] gap-x-1 items-center'>
								<p className='text-black text-sm font-normal leading-[14px]'>
									{/* insert email icon */}@
								</p>
								<p className='text-black text-sm font-normal leading-[14px]'>
									Contact Support
								</p>
							</div>
						</Link>

						<Link href='#' id='socialLinks'>
							<div className='flex w-[219px] justify-between items-center'>
								<p className='text-black text-sm font-normal leading-[14px]'>
									Facebook
								</p>
								<p className='text-black text-sm font-normal leading-[14px]'>
									Instagram
								</p>
								<p className='text-black text-sm font-normal leading-[14px]'>
									Twitter
								</p>
								<p className='text-black text-sm font-normal leading-[14px]'>
									TikTok
								</p>
								<p className='text-black text-sm font-normal leading-[14px]'>
									Youtube
								</p>
								<p className='text-black text-sm font-normal leading-[14px]'>
									LinkedIn
								</p>
							</div>
						</Link>
					</div>
					<div
						id='footerBelow'
						className='flex w-full justify-center items-center '
					>
						<p className='text-black text-sm font-normal leading-[14px]'>
							© {new Date().getFullYear()} DealDashPro. All Rights Reserved.
						</p>
					</div>
				</div>
			</MaxWidthWrapper>
		</div>
	);
};

export default Footer;
