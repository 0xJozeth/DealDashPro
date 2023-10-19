import Inventory from './Inventory';
import Navigator from './Navigator';

export const Hero = () => {
	return (
		<>
			<main className='flex justify-between items-center'>
				<div className=''>This is where your Google Map will live.</div>
				<aside className='p-2 border border-blue-700'>
					<Navigator />
				</aside>
			</main>
		</>
	);
};
