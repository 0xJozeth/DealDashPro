import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/server';

const Navbar = () => (
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

				<nav className='flex justify-between gap-8 items-center h-20'>
					<Link href='/'>
						<div>
							<p className='text-black text-sm font-normal leading-[14px]'>
								Post a deal
							</p>
						</div>
					</Link>
					<Link href='/'>
						<div className='flex items-center justify-center gap-4 w-[95px] h-[51px] bg-white rounded-[30px] shadow hover:shadow-lg transition-all duration-30 border border-neutral-200'>
							<div className='relative'>
								<Image
									src={'/burgerMenu1.svg'}
									width={19}
									height={22}
									alt={'logo'}
									className=''
								/>
							</div>
							<div>
								<Image
									src={'/signOutPic.svg'}
									width={35}
									height={35}
									alt={'logo'}
									className=''
								/>
							</div>
						</div>
					</Link>
				</nav>
			</header>
		</MaxWidthWrapper>
	</>
);

export default Navbar;
