import Dashboard from '@/components/Dashboard';
import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

const Page = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const auth = await isAuthenticated();
  if (!(user && user.id && auth)) redirect('/auth-callback?origin=dashboard');

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) redirect('/auth-callback?origin=dashboard');

  return <Dashboard></Dashboard>;
};

export default Page;
