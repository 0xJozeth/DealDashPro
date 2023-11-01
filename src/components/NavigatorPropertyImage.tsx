import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const propImages = [
	{
		name: 'prop1',
		props: {
			src: '/prop1.png',
			width: 215,
			height: 115,
			alt: 'property',
			className: 'object-cover',
		},
	},
];

function NavigatorPropertyImage({ props }: any) {
	const [user, setUser] = useState<any>();
	const [authStatus, setAuthStatus] = useState(null);

	useEffect(() => {
		const getKindeSession = async () => {
			const res = await fetch('/api/kindeSession');
			const data = await res.json();
			setUser(data.user);
			setAuthStatus(data.authenticated);
		};

		getKindeSession();
	}, []);

	return (
		<div className='overflow-hidden h-[115px]'>
			{propImages.map((item, index) => (
				<div key={index} className='flex relative min-w-[50%]'>
					<Image
						src={item.props.src}
						width={item.props.width}
						height={item.props.height}
						alt={item.props.alt}
						className={item.props.className}
					/>
				</div>
			))}
		</div>
	);
}

export default NavigatorPropertyImage;
