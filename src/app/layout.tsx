import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Lato } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';

const lato = Lato({
	subsets: ['latin'],
	weight: ['100', '300', '400', '700', '900'],
});

export const metadata: Metadata = {
	title: 'DealDashPro',
	description: 'Get your next deal done with DealDashPro',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className='light'>
			<Providers>
				<body
					className={cn(
						'min-h-screen font-sans antialiased grainy pt-20',
						lato.className
					)}
				>
					<header className='fixed  w-full top-0 bg-slate-50 z-[9999]'>
						<Navbar />
					</header>
					{children}
				</body>
			</Providers>
		</html>
	);
}
