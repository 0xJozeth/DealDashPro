'use client';

import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Hero } from '@/components/Hero/Hero';
import Navigator from '@/components/Hero/Navigator';
import NavigatorAlt from './ClientComponents/NavigatorAlt';

export default function Map() {
	return (
		<GoogleMap
			zoom={4}
			center={{ lat: 34, lng: -67 }}
			mapContainerClassName='relative w-full h-[calc(100vh-80px)]'
		>
			{/* <Navigator /> */}
			<NavigatorAlt />
		</GoogleMap>
	);
}
