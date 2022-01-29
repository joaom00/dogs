import { GetServerSidePropsContext } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import { supabase } from '@/lib/supabase';

import ProfileTemplate from '@/templates/Profile';
import { getProfile, getUserPosts } from '@/templates/Profile/queries';

export default function ProfilePage({ isFollowed }: { isFollowed: boolean }) {
  return <ProfileTemplate isFollowed={isFollowed} />;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const query = ctx.query;
  const username = query.username as string;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([{ scope: 'profile', type: 'detail', username }], getProfile);
  await queryClient.prefetchQuery([{ scope: 'profile', type: 'posts', username }], getUserPosts);

  const { user } = await supabase.auth.api.getUserByCookie(ctx.req);
  const res = await supabase
    .from('follows')
    .select('*', { count: 'exact' })
    .match({ follower_username: user?.user_metadata.username, followed_username: username });

  return {
    props: {
      isFollowed: !!res.count,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
