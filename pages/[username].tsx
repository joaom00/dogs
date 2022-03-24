import type { GetServerSidePropsContext } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import { supabase } from '@lib/supabase';
import { type ProfileDetailOptions, postKeys, profileKeys } from '@lib/queryFactory';

import { Profile, getProfile, getUserPosts } from '@templates/Profile';

export default function ProfilePage() {
  return <Profile />;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const query = ctx.query;
  const username = query.username as string;
  const { user } = await supabase.auth.api.getUserByCookie(ctx.req);

  const options: ProfileDetailOptions = {
    followedUsername: username,
    followerUsername: user?.user_metadata.username,
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(profileKeys.detail(options), getProfile);
  await queryClient.prefetchQuery(postKeys.profile(username), getUserPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
