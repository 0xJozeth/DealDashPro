import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';

const UserNavigation = () => {
	return (
		<>
			<LoginLink>
				<div className='flex w-full h-8 py-5 justify-start items-center bg-white hover:bg-zinc-100 transition-all duration-30'>
					<p className='text-black text-sm font-semibold leading-[14px] p-3'>
						Login
					</p>
				</div>
			</LoginLink>
			<RegisterLink>
				<div className='flex w-full h-8 py-5 justify-start items-center bg-white border-b border-zinc-300 hover:bg-zinc-100 transition-all duration-30'>
					<p className='text-black text-sm font-normal leading-[14px] p-3'>
						Sign Up
					</p>
				</div>
			</RegisterLink>
			<Link href='#'>
				<div className='flex w-full h-8 py-5 justify-start items-center bg-white hover:bg-zinc-100 transition-all duration-30'>
					<p className='text-black text-sm font-normal leading-[14px] p-3'>
						Post A Deal
					</p>
				</div>
			</Link>
			<Link href='#'>
				<div className='flex w-full h-8 py-5 justify-start gap-1 items-center bg-white hover:bg-zinc-100 transition-all duration-30'>
					<p className='text-black text-sm font-normal leading-[14px] p-3'>
						Contact Support
					</p>
					<FontAwesomeIcon icon={faLink} className='text-sm' />
				</div>
			</Link>
		</>
	);
};

export default UserNavigation;
