'use client';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Navbar from '@/components/Navbar';
import { Hero } from '@/components/Hero/Hero';

export default function Home() {
	return (
		<MaxWidthWrapper>
			{/* <Navbar /> */}
			<Hero />
		</MaxWidthWrapper>
	);
}
