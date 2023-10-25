'use client';

import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Hero } from '@/components/Hero/Hero';
import Navigator from '@/components/Hero/Navigator';
import Map from '@/components/Map';
import Navbar from '@/components/Navbar';

export default function Home() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
	});

	if (!isLoaded) return <p>Loading...</p>;
	return (
		<section className='relative'>
			<div className='flex justify-center items-center'>
				<Map />
			</div>
		</section>
	);
}
