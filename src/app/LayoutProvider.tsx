'use client';

import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();

	console.log('pathname', pathname);

	return (
		<>
			{children}
			{pathname !== '/' && <Footer />}
		</>
	);
};

export default LayoutProvider;
