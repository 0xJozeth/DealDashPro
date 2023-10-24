import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function NavigatorPropertyImage({ props }: any) {
	console.log('PROPS', props);
	const [user, setUser] = useState<any>();
	const [authStatus, setAuthStatus] = useState(null);

	console.log('current user right now', user);

	useEffect(() => {
		const getKindeSession = async () => {
			const res = await fetch('/api/kindeSession');
			const data = await res.json();
			setUser(data.user);
			setAuthStatus(data.authenticated);
			console.log('current data right now', data);
		};

		getKindeSession();
	}, []);

	return (
		<div className='overflow-hidden'>
			<Image
				src={user?.picture ?? '/signOutPic.svg'}
				width={35}
				height={35}
				alt={'logo'}
				className='pointer-events-none'
			/>
		</div>
	);
}

export default NavigatorPropertyImage;
