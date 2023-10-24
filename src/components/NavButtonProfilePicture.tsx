import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import React from 'react';

//check if the user is logged in
const { getUser } = getKindeServerSession();
const user = getUser();

console.log('user', user);

function NavButtonProfilePicture() {
	return (
		<div className=''>
			<Image
				src={user && user.picture ? user.picture : '/signOutPic.svg'}
				width={35}
				height={35}
				alt={'logo'}
				className='pointer-events-none rounded-full'
			/>
		</div>
	);
}

export default NavButtonProfilePicture;
