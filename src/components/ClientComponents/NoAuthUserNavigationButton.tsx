import Link from 'next/link';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const NoAuthUserNavigationButton = () => {
	//check if the user is logged in
	const { getUser } = getKindeServerSession();
	const user = getUser();

	return (
		<div className='flex gap-6 justify-between items-center'>
			<RegisterLink>
				<div className='flex w-24 h-11 py-5 justify-center items-center border border-black rounded-[10px] bg-white hover:bg-zinc-100 transition-all duration-30'>
					<p className='text-black text-sm font-normal leading-normal'>
						Sign Up
					</p>
				</div>
			</RegisterLink>
			<LoginLink>
				<div className='flex w-24 h-11 py-5 justify-center items-center  rounded-[10px] bg-[#58A053] hover:bg-[#4D8C49] transition-all duration-30'>
					<p className='text-white text-sm font-normal leading-normal'>Login</p>
				</div>
			</LoginLink>
		</div>
		// <Image
		// 	src={
		// 		'https://lh3.googleusercontent.com/a/ACg8ocK7iPDJ2sXN4zD7ZzK_nej3XZKTNewNPkbpde64c8bX=s96-c'
		// 	}
		// 	width={225}
		// 	height={225}
		// 	alt={'logo'}
		// 	className='p-2'
		// />
	);
};

export default NoAuthUserNavigationButton;
