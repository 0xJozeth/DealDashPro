'use client';

import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Hero } from '@/components/Hero/Hero';
import Navigator from '@/components/Hero/Navigator';

export default function Map({ children }: { children: React.ReactNode }) {
	return (
		<GoogleMap
			zoom={4}
			center={{ lat: 44, lng: -80 }}
			mapContainerClassName='relative w-full h-[calc(100vh-80px)]'
		>
			{children}
		</GoogleMap>
	);
}
