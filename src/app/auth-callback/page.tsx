import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '../_trpc/client';
import { useEffect } from 'react';

const Page = async () => {
	const router = useRouter();

	const searchParams = useSearchParams();
	const origin = searchParams.get('origin');

	const { data, isLoading } = trpc.authCallback.useQuery(undefined, {
		//NOTE: The method below is now deprecated. Use the one below instead.
		// onSuccess: ({ success }) => {
		// 	if (success) {
		// 		router.push(origin ? `/${origin}` : '/dashboard');
		// 	}
		// },
	});

	//IMPORTANT: "onSuccess is no longer called from setQueryData" per the docs. Must use useEffect instead. See https://tanstack.com/query/v4/docs/react/guides/migrating-to-react-query-4#onsuccess-is-no-longer-called-from-setquerydata
	useEffect(() => {
		if (data && data.success) {
			router.push(origin ? `/${origin}` : '/dashboard');
		}
	}, [data, origin, router]);
};

export default Page;
