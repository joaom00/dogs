import { GetServerSidePropsContext } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import ProfileTemplate from '@/templates/Profile';
import { getProfile } from '@/templates/Profile/queries';

export default function Profile() {
  return <ProfileTemplate />;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const query = ctx.query;
  const username = query.username as string;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([{ scope: 'profile', username }], getProfile);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
