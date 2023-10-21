const PropertyTitle = () => {
	return (
		<div className='flex flex-col w-full h-auto py-2'>
			<div className='flex items-center py-4 h-[1.8rem]'>
				<h1 className='font-semibold text-xl'>
					Quick Flipping Opportunity in Houston, TX🏠
				</h1>
			</div>
			<div className='flex items-center justify-between py-4 h-[.625rem]'>
				<p>Quick Flipping Opportunity in Houston, TX🏠</p>
				<p>View full address</p>
				<p>Deal Posted: {new Date().toDateString()}</p>
			</div>
		</div>
	);
};

export default PropertyTitle;
