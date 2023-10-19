import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';

const Navbar = () => (
	<>
		<MaxWidthWrapper>
			<header className='flex justify-between items-center border border-slate-800 shadow-md px-2'>
				<Image
					src={'/next.svg'}
					width={125}
					height={125}
					alt={'logo'}
					className='p-2'
				/>

				<nav className='flex justify-between h-20'>
					<ul className='flex justify-between gap-x-2'>
						<li className=' flex justify-center items-center px-2'>
							<Link href='/' className='px-4 bg-slate-400 '>
								<button type='button' className='p-2 text-white '>
									Login
								</button>
							</Link>
						</li>
						<li className='flex justify-center items-center px-2'>
							<Link href='/' className='px-4 bg-slate-400 '>
								<button type='button' className='p-2 text-white '>
									Register
								</button>
							</Link>
						</li>
						<li className=' flex justify-center items-center px-2'>
							<Link href='/' className='px-4 bg-slate-400 '>
								<button type='button' className='p-2 text-white '>
									Post A Deal
								</button>
							</Link>
						</li>
					</ul>
				</nav>
			</header>
		</MaxWidthWrapper>
	</>
);

export default Navbar;
