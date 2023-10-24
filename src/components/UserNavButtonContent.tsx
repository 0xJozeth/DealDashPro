import Image from 'next/image';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const UserNavButtonContent = () => {
	// check if the user is logged in
	const { getUser } = getKindeServerSession();
	const user = getUser();

	return (
		<>
			<div className=''>
				<Image
					src={'/burgerMenu1.svg'}
					width={19}
					height={22}
					alt={'logo'}
					className='pointer-events-none'
				/>
			</div>
			<div className='select-none'>
				<Image
					src={'/signOutPic.svg'}
					width={35}
					height={35}
					alt={'logo'}
					className='pointer-events-none'
				/>
			</div>{' '}
		</>
	);
};

export default UserNavButtonContent;
