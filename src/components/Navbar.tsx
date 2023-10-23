'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';

const Navbar = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<MaxWidthWrapper>
				<header className='flex justify-between items-center px-2'>
					<Link href='/'>
						<Image
							src={'/ddpBlack.svg'}
							width={225}
							height={225}
							alt={'logo'}
							className='p-2'
						/>
					</Link>

					<nav className='group flex relative justify-between gap-8 items-center h-20'>
						<Link href='#'>
							<div>
								<p className='text-black text-sm font-normal leading-[14px]'>
									Post a deal
								</p>
							</div>
						</Link>
						{children}
					</nav>
				</header>
			</MaxWidthWrapper>
		</>
	);
};

export default Navbar;
