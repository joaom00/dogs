import { GetServerSidePropsContext } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import { supabase } from '@/lib/supabase';

import ProfileTemplate from '@/templates/Profile';
import { getProfile, getUserPosts } from '@/templates/Profile/queries';

export default function Profile() {
  return <ProfileTemplate />;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const query = ctx.query;
  const username = query.username as string;
  const { user } = await supabase.auth.api.getUserByCookie(ctx.req);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([{ scope: 'profile', type: 'detail', username }], () =>
    getProfile(username, user?.user_metadata.username)
  );
  await queryClient.prefetchQuery([{ scope: 'profile', type: 'posts', username }], getUserPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
