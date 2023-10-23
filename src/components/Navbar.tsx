'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';

const Navbar = ({ children }: { children: React.ReactNode }) => {
	const [navOpen, setNavOpen] = useState(false);
	const navbarButtonRef = useRef<HTMLDivElement>(null);
	const navbarDropdownMenuRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target as HTMLElement;

		if (
			navbarButtonRef.current &&
			!navbarButtonRef.current.contains(target) &&
			navbarDropdownMenuRef.current &&
			!navbarDropdownMenuRef.current.contains(target)
		) {
			setNavOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	const toggleNavOpen = () => {
		setNavOpen((prevState) => !prevState);
	};

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

						<div
							onClick={toggleNavOpen}
							id='navbarButton'
							ref={navbarButtonRef}
							className='flex items-center justify-center gap-4 w-[95px] h-[51px] bg-white rounded-[30px] shadow hover:shadow-lg transition-all duration-30 border border-neutral-200'
						>
							<div className=''>
								<Image
									src={'/burgerMenu1.svg'}
									width={19}
									height={22}
									alt={'logo'}
									className='pointer-events-none'
								/>
							</div>
							<div className='select-none'>
								<Image
									src={'/signOutPic.svg'}
									width={35}
									height={35}
									alt={'logo'}
									className='pointer-events-none'
								/>
							</div>
						</div>

						{navOpen && (
							<div
								id='navbarDropdownMenu'
								ref={navbarDropdownMenuRef}
								className={`absolute py-2 top-[70px] right-0 flex flex-col w-[250px] rounded-[10px] overflow-hidden bg-white shadow-xl border border-zinc-200 ${
									!navOpen ? 'opacity-0' : 'opacity-100'
								}`}
							>
								{children}
							</div>
						)}
					</nav>
				</header>
			</MaxWidthWrapper>
		</>
	);
};

export default Navbar;
