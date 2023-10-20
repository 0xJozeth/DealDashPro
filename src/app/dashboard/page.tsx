import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

const Page = () => {
	const { getUser } = getKindeServerSession();
	const user = getUser();

	return <div>Hello {user.email}</div>;

	if (!user || !user.email) return redirect('/auth-callback?origin=dashboard');
};

export default Page;
