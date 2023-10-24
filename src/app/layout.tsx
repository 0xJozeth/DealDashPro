import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import Footer from '@/components/Footer';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import UserNavigation from '@/components/UserNavigation';
import NavbarButton from '@/components/NavbarButton';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import NoAuthUserNavigationButton from '@/components/ClientComponents/NoAuthUserNavigationButton';
import NavButtonProfilePicture from '@/components/NavButtonProfilePicture';
import LayoutProvider from './LayoutProvider';
import Home from './page';
import Map from '@/components/Map';
import MapWrapper from '@/components/MapWrapper';
import Navigator from '@/components/Hero/Navigator';
import NavigatorPropertyImage from '@/components/NavigatorPropertyImage';

//setting to `false` prevents Font Awesome core SVG library from inserting <style> elements into the <head> of the page.
config.autoAddCss = false;

const lato = Lato({
	subsets: ['latin'],
	weight: ['100', '300', '400', '700', '900'],
});

export const metadata: Metadata = {
	title: 'DealDashPro',
	description: 'Get your next deal done with DealDashPro',
};

export default function RootLayout({}: // children,
{
	// children: React.ReactNode;
}) {
	// check if the user is logged in
	const { getUser } = getKindeServerSession();
	const user = getUser();

	console.log('user', user);

	return (
		<html lang='en' className='light'>
			<Providers>
				<body
					className={cn(
						'min-h-screen font-sans antialiased grainy pt-20',
						lato.className
					)}
				>
					<LayoutProvider>
						<header className='fixed border-b border-zinc-200 shadow-sm w-full bg-white top-0 z-[99999]'>
							{/* Navbar is a client component */}
							<Navbar>
								{/* NavbarButton is a client component */}
								{user ? (
									<>
										<NavbarButton
											profilePicture={<NavButtonProfilePicture />}
											navigation={<UserNavigation />}
										></NavbarButton>
									</>
								) : (
									<NoAuthUserNavigationButton />
								)}
							</Navbar>
						</header>
						<Home>
							<MapWrapper>
								<Map>
									<Navigator>
										<NavigatorPropertyImage />
									</Navigator>
								</Map>
							</MapWrapper>
						</Home>
						{/* <main>{children}</main> */}
					</LayoutProvider>
				</body>
			</Providers>
		</html>
	);
}

{
	/* The <NavButtonProfilePicture /> and <UserNavigation /> components are server components. We instantiate
'profilePicture' and 'navigation' as props that are passed to the client component <NavbarButton>. We are then able
to access the destructured props directly with the NavbarButton TSX. */
}
