import { useRouter } from 'next/router';
import { type QueryFunctionContext, useQuery } from 'react-query';

import { supabase } from '@lib/supabase';
import { profileKeys } from '@lib/queryFactory';
import { assertResponseOk } from '@lib/apiError';

type Follow = {
  follow: {
    name: string;
    username: string;
    avatar_url: string;
  };
};

type GetFollowsContext = QueryFunctionContext<ReturnType<typeof profileKeys['follow']>>;

const supabaseQuery = {
  followers: 'follow:follower_username(name, username, avatar_url)',
  following: 'follow:followed_username(name, username, avatar_url)',
};

async function getFollows(ctx: GetFollowsContext): Promise<Array<Follow> | null> {
  const [{ scope, username }] = ctx.queryKey;

  const response = await supabase
    .from('follows')
    .select(supabaseQuery[scope])
    .eq(scope === 'followers' ? 'followed_username' : 'follower_username', username);

  assertResponseOk(response);

  return response.data;
}

export const useFollows = (scope: 'followers' | 'following', open: boolean) => {
  const router = useRouter();
  const username = router.query.username as string;

  return useQuery(profileKeys.follow(scope, username), getFollows, {
    enabled: open,
  });
};
