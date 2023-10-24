import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import React from 'react';

function NavigatorPropertyImage() {
	//check if the user is logged in
	const { getUser } = getKindeServerSession();
	const user = getUser();

	return (
		<div className='overflow-hidden'>
			<Image
				src={user.picture ?? '/signOutPic.svg'}
				width={35}
				height={35}
				alt={'logo'}
				className='pointer-events-none'
			/>
		</div>
	);
}

export default NavigatorPropertyImage;
