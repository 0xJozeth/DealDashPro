import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '../_trpc/client';
import React from 'react';

const Page = async () => {
	const router = useRouter();

	const searchParams = useSearchParams();
	const origin = searchParams.get('origin');

	const { data, isLoading } = trpc.authCallback.useQuery(undefined);

	React.useEffect(() => {
		if (data && data.sucess) {
			router.push(origin ? `/${origin}` : '/dashboard');
		}
	}, [data]);
};

export default Page;
