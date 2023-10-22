import Image from 'next/image';
import Link from 'next/link';

//Font Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const PropertyMain = () => {
	return (
		<section className=' w-full py-4 h-auto'>
			<div id='mainSection' className='flex justify-between w-full gap-4'>
				<div className='flex flex-col w-[708px] h-auto'>
					<section
						id='pricingDetails'
						className='flex flex-col w-full gap-y-2 pb-[24px] border-b border-b-zinc-300'
					>
						<div className='flex items-center w-full gap-x-4 space-between'>
							<p className='font-semibold text-lg'>$253,000</p>
							<p className='text-xs'>ARV: $375,000</p>
							<p className='text-xs'>
								<span className='font-semibold text-lg'>4</span> Beds
							</p>
							<p className='text-xs'>
								<span className='font-semibold text-lg'>2</span> Baths
							</p>
							<p className='text-xs'>
								<span className='font-semibold text-lg'>2,235</span> Sq Ft
							</p>
						</div>
						<div>
							<Link href='#' className='text-xs font-semibold underline'>
								make an offer
							</Link>
						</div>
					</section>
					<section
						id='aboutThisListing'
						className='flex flex-col w-full py-[24px] gap-y-4'
					>
						<h2 className='text-[22px] font-semibold leading-relaxed'>
							About this listing
						</h2>
						{/* TODO: add show more button logic */}
						<p className='text-black text-base font-normal leading-normal'>
							This property boasts a range of desirable features, making it an
							attractive investment option. Heres what you need to know: 30-Day
							Lease Back:
						</p>
						<ul className='text-black text-base font-normal leading-normal'>
							<li>• The property requires a 30-day lease back.</li>
							<li>
								• No Flood Zone: Rest easy knowing that this property is not
								located in a flood zone, reducing potential risks and insurance
								costs.
							</li>
							<li>• VA Loan: The property is under a VA Loan....</li>
						</ul>
						<div>
							<Link href='#' className='text-xs font-semibold underline'>
								View More
							</Link>
						</div>
					</section>
					{/* TODO: Mapping. */}
					<section id='details' className='flex flex-col w-full py-2 gap-y-4'>
						<h3 className='text-sm font-semibold'>Details</h3>
						<div
							id='detailsColumnsWrapper'
							className='flex gap-8 w-full justify-between'
						>
							<div className='flex flex-col gap-y-2 w-full'>
								<div className='flex justify-between items-center py-1 border-b border-zinc-200'>
									<p className='text-sm text-neutral-500'>Sq ft</p>

									<p className='font-normal  leading-tight text-sm text-zinc-950'>
										2,235
									</p>
								</div>
								<div className='flex justify-between items-center py-1 border-b border-zinc-200'>
									<p className='text-sm text-neutral-500'>Type</p>

									<p className='font-normal  leading-tight text-sm text-zinc-950'>
										Single family
									</p>
								</div>
								<div className='flex justify-between items-center py-1 border-b border-zinc-200'>
									<p className='text-sm text-neutral-500'>Year built</p>

									<p className='font-normal  leading-tight text-sm text-zinc-950'>
										2003
									</p>
								</div>
							</div>
							<div className='flex flex-col gap-y-2 w-full'>
								<div className='flex justify-between items-center py-1 border-b border-zinc-200'>
									<p className='text-sm text-neutral-500'>Lot Size</p>

									<p className='font-normal  leading-tight text-sm text-zinc-950'>
										.25 Acres
									</p>
								</div>
								<div className='flex justify-between items-center py-1 border-b border-zinc-200'>
									<p className='text-sm text-neutral-500'>Bedrooms</p>

									<p className='font-normal  leading-tight text-sm text-zinc-950'>
										4
									</p>
								</div>
								<div className='flex justify-between items-center py-1 border-b border-zinc-200'>
									<p className='text-sm text-neutral-500'>Bathrooms</p>

									<p className='font-normal  leading-tight text-sm text-zinc-950'>
										2
									</p>
								</div>
							</div>
						</div>
					</section>
					{/* TODO: Mapping. */}
					<section className='flex flex-col w-full py-[24px] gap-1 '>
						<h3 className='text-[22px] font-semibold leading-relaxed'>
							Documents
						</h3>
						<Link href='#'>
							<p className='text-black text-sm font-normal leading-[18px] underline'>
								Inspection Report
							</p>
						</Link>
						<Link href='#'>
							<p className='text-black text-sm font-normal leading-[18px] underline'>
								Preferred Lender - Quanta
							</p>
						</Link>
					</section>
					{/* TODO: Mapping. */}
					<section
						id='media'
						className='flex flex-col w-full py-[24px] gap-1 border-t border-neutral-200'
					>
						<h3 className='text-[22px] font-semibold leading-relaxed'>
							Matterport - 3D walkthrough
						</h3>
						<div className='w-fit rounded-[10px] overflow-hidden '>
							<Image
								src={'/matterport1.png'}
								width={400}
								height={264}
								alt={'logo'}
								className='object-cover blur-sm'
							/>
						</div>
					</section>
					<section
						id='media'
						className='flex flex-col w-full py-[24px] gap-1 border-t border-neutral-200'
					>
						<h3 className='text-[22px] font-semibold leading-relaxed'>
							Street view
						</h3>
						<div className='relative w-[400px] rounded-[10px] overflow-hidden '>
							<Image
								src={'/streetView1.png'}
								width={400}
								height={264}
								alt={'logo'}
								className='object-cover blur-sm'
							/>
							<div className='absolute inset-0 flex justify-center items-center'>
								<div className='w-[31px] h-[31px] bg-zinc-300 rounded-full'>
									<FontAwesomeIcon
										icon={faLock}
										className='w-full h-full text-center text-neutral-500 mt-[7px]'
									/>
								</div>
							</div>
						</div>
					</section>
					<section
						id='media'
						className='flex flex-col w-full py-[24px] gap-1 border-t border-neutral-200'
					>
						<h3 className='text-[22px] font-semibold leading-relaxed'>
							Street view
						</h3>
						<div className='relative w-[400px] rounded-[10px] overflow-hidden'>
							<div className='relative'>
								<Image
									src={'/location1.png'}
									width={400}
									height={264}
									alt={'logo'}
									className='object-cover blur-sm'
								/>
								<div className='absolute inset-0 bg-zinc-700 opacity-50'></div>
							</div>
							<div className='absolute inset-0 flex justify-center items-center'>
								<div className='w-[31px] h-[31px] bg-zinc-300 rounded-full'>
									<FontAwesomeIcon
										icon={faLock}
										className='w-full h-full text-center text-neutral-500 mt-[7px]'
									/>
								</div>
							</div>
						</div>
					</section>
				</div>

				{/* TODO: dynamically update the rail size if view more is opened. */}
				<div
					id='sidebarRail'
					className='flex flex-col gap-4 w-[300px] h-[1500px]'
				>
					<div
						id='sidebar'
						className='flex flex-col w-[300px] h-[300px] sticky top-20'
					>
						{/* TODO: mapping for buttons */}
						<div className='flex flex-col gap-4 justify-center items-center py-4'>
							<Link href='#'>
								<div className='flex justify-center items-center w-[250px] min-w-[175px] h-[45px] rounded-[5px] bg-[#58A053]'>
									<p className='text-white text-base font-medium leading-normal'>
										Make an offer
									</p>
								</div>
							</Link>
							<Link href='#' className='group'>
								<div className='flex justify-center items-center w-[250px] min-w-[175px] h-[45px] rounded-[5px] border border-black group-hover:border-[#58A053] transition-all duration-300'>
									<p className='text-black text-base font-medium leading-normal group-hover:text-[#58A053] transition-all duration-300'>
										Win it now for $250K
									</p>
								</div>
							</Link>

							<div className='flex justify-center items-center w-[250px] min-w-[175px] h-[45px]'>
								<p className='text-black text-sm font-normal leading-[14px] text-center'>
									If someone buys for this price, no more offers will be
									accepted.
								</p>
							</div>

							<div
								id='divider'
								className='w-full h-[0px] border border-neutral-200'
							></div>

							<div
								id='companyDetailsWrapper'
								className='flex justify-center items-start w-full gap-4'
							>
								<div
									id='companyInfoWrapper'
									className='flex flex-col gap-4 w-full'
								>
									<div className='flex w-full'>
										<div className='flex w-full'>
											<div
												id='companyImage'
												className='flex h-[60px] rounded-full overflow-hidden'
											>
												{/* TODO: Mapping. */}
												{/* TODO: need to look into image resizing by uploader and the correct implementation. */}
												<Image
													src={'/companyPic1.png'}
													width={60}
													height={60}
													alt={'logo'}
													className='aspect-square object-cover'
												/>
											</div>
										</div>
										<div className='flex flex-col w-full'>
											<div className='flex flex-col w-full gap-2'>
												<p
													id=''
													className='text-black text-base font-semibold leading-tight'
												>
													Luis Gamez
												</p>
												<p
													id=''
													className='text-neutral-500 text-sm font-normal leading-tight'
												>
													Disposition Manager
												</p>
											</div>
											<div className='flex flex-col w-full gap-2'>
												<div className='flex items-center gap-2'>
													<FontAwesomeIcon
														icon={faPhone}
														className='text-[#58A053] text-sm font-normal leading-tight'
													/>
													<p
														id=''
														className='text-[#58A053] text-sm font-normal leading-tight'
													>
														Phone Number
													</p>
												</div>
												<div className='flex items-center gap-2'>
													<FontAwesomeIcon
														icon={faEnvelope}
														className='text-[#58A053] text-sm font-normal leading-tight'
													/>
													<p
														id=''
														className='text-[#58A053] text-sm font-normal leading-tight'
													>
														luisbuyreinow8@gmail.com
													</p>
												</div>
											</div>
										</div>
									</div>

									<Link href='#'>
										<div className='flex justify-center items-center w-full min-w-[175px] h-[45px] rounded-[5px] bg-neutral-500'>
											<p className='text-white text-base font-medium leading-normal'>
												Inquire about property
											</p>
										</div>
									</Link>
									<Link href='#'>
										<div className='flex justify-center items-center w-full min-w-[175px] h-[45px] rounded-[5px] border border-black'>
											<p className='text-black text-base font-medium leading-normal'>
												View all company deals
											</p>
										</div>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PropertyMain;
