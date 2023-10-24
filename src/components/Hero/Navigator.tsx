import NavigatorPropertyImage from '../NavigatorPropertyImage';

const Navigator = () => {
	return (
		<div className='fixed top-28 right-8 flex justify-center items-center z-[9999]'>
			<div
				className='m-8 p-8 top-8 right-0 w-[500px] h-[1000px] min-w-[300px] rounded-[10px] bg-slate-50 z-[100] shadow-xl overflow-hidden'
				onMouseEnter={() => {
					const container = document.getElementById('navigator-container');
					if (container) {
						container.classList.remove('overflow-hidden');
						container.classList.add('overflow-y-scroll');
						container.classList.add('no-scrollbar');
					}
				}}
				onMouseLeave={() => {
					const container = document.getElementById('navigator-container');
					if (container) {
						container.classList.remove('overflow-y-scroll');
						container.classList.add('overflow-hidden');
						container.classList.remove('no-scrollbar');
					}
				}}
			>
				<input
					type='text'
					placeholder='Search'
					className='w-full p-2 mb-4 rounded'
				/>

				<div
					id='navigator-container'
					className='grid grid-cols-2 gap-4 h-[calc(100%-40px)] overflow-hidden'
				>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-blue-500'>
						<NavigatorPropertyImage />
					</div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-red-500'></div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-green-500'></div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-yellow-500'></div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-red-500'></div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-blue-500'></div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-green-500'></div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-yellow-500'></div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-red-500'></div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-blue-500'></div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-green-500'></div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-yellow-500'></div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-red-500'></div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-blue-500'></div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-green-500'></div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-yellow-500'></div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-red-500'></div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-blue-500'></div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-green-500'></div>
					<div className='min-w-full h-0 pb-[100%] rounded-[10px] bg-yellow-500'></div>
				</div>
			</div>
		</div>
	);
};

export default Navigator;
