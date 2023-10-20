'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '../_trpc/client';
import { useEffect } from 'react';

const Page = () => {
	const router = useRouter();

	const searchParams = useSearchParams();
	const origin = searchParams.get('origin');

	trpc.authCallback.useQuery(undefined, {
		onSuccess: ({ success }) => {
			if (success) {
				// user is synced to db
				router.push(origin ? `/${origin}` : '/dashboard');
			}
		},
		onError: (err) => {
			if (err.data?.code === 'UNAUTHORIZED') {
				router.push('/sign-in');
			}
		},
		retry: true,
		retryDelay: 500,
	});

	return (
		<div className='w-full mt-24 flex justify-center'>
			<div className='flex flex-col items-center gap-2'>
				<h3 className='font-semibold text-xl'>Setting up your account</h3>
				<p>You will be redirected shortly.</p>
			</div>
		</div>
	);

	//{
	//NOTE: The method(s) below is now deprecated. Use the one below instead.
	// onSuccess: ({ success }) => {
	// 	if (success) {
	// 		router.push(origin ? `/${origin}` : '/dashboard');
	// 	}
	// },
	//});

	// onError: ({ err }) => {
	// 	if (err.data?.code === 'UNAUTHORIZED') {
	// 		router.push('/sign-in');
	// 	}
	// },
	//IMPORTANT: "onSuccess is no longer called from setQueryData" per the docs. Must use useEffect instead. See https://tanstack.com/query/v4/docs/react/guides/migrating-to-react-query-4#onsuccess-is-no-longer-called-from-setquerydata
	// useEffect(() => {
	// 	if (data && data.success) {
	// 		router.push(origin ? `/${origin}` : '/dashboard');
	// 	} else if (data && !data.success) {
	// 		router.push('/sign-in');
	// 	}

	// 	retry: true;
	// 	retryDelay: 500;
	// }, [data, origin, router]);
};

export default Page;
