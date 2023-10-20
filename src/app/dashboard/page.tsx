import Dashboard from '@/components/Dashboard';
import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

const Page = async () => {
	const { getUser } = getKindeServerSession();
	const user = getUser();

	if (!user || !user.id) return redirect('/auth-callback?origin=dashboard');

	//send the user to the dashboard if they are present in the db
	const dbUser = await db.user.findFirst({
		where: {
			id: user.id,
		},
	});

	if (!dbUser) redirect('/auth-callback?origin=dashboard');

	return <Dashboard />;
};

export default Page;
