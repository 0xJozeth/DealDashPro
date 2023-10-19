'use client';

import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Hero } from '@/components/Hero/Hero';

export default function Home() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
	});

	if (!isLoaded) return <p>Loading...</p>;
	return (
		<>
			<Map />
			<Hero />
		</>
	);

	function Map() {
		return (
			<GoogleMap
				zoom={4}
				center={{ lat: 44, lng: -80 }}
				mapContainerClassName='map-container w-full h-[100vh]'
			></GoogleMap>
		);
	}
}
