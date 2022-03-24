import { useRouter } from 'next/router';
import { type QueryFunctionContext, useQuery } from 'react-query';

import { useUser } from '@context/AuthContext';
import { supabase } from '@lib/supabase';
import { type ProfileDetailOptions, postKeys, profileKeys } from '@lib/queryFactory';
import { assertResponseOk } from '@lib/apiError';

/* -------------------------------------------------------------------------------------------------
 * useProfile
 * -----------------------------------------------------------------------------------------------*/

export type TProfile = {
  name: string;
  username: string;
  avatar_url: string;
  bio: string;
  postsCount: Array<{ count: number }>;
  followersCount: Array<{ count: number }>;
  followingCount: Array<{ count: number }>;
  hasFollowed: boolean;
};

type GetProfileContext = QueryFunctionContext<ReturnType<typeof profileKeys['detail']>>;

export const getProfile = async (ctx: GetProfileContext): Promise<TProfile> => {
  const [{ followerUsername, followedUsername }] = ctx.queryKey;

  const response = await supabase
    .from('profiles')
    .select(
      'name, username, bio, avatar_url, postsCount:posts!user_username(count), followersCount:follows!followed_username(count), followingCount:follows!follower_username(count)'
    )
    .eq('username', followedUsername)
    .single();

  assertResponseOk(response);

  const hasFollowedResponse = await supabase
    .from('follows')
    .select('*', { count: 'exact' })
    .match({ follower_username: followerUsername, followed_username: followedUsername });

  return {
    ...response.data,
    hasFollowed: !!hasFollowedResponse.count,
  };
};

export const useProfile = () => {
  const router = useRouter();
  const username = router.query.username as string;
  const { user } = useUser();

  const options: ProfileDetailOptions = {
    followedUsername: username,
    followerUsername: user?.user_metadata.username,
  };

  return useQuery(profileKeys.detail(options), getProfile, {
    staleTime: Infinity,
  });
};

/* -------------------------------------------------------------------------------------------------
 * useUserPosts
 * -----------------------------------------------------------------------------------------------*/

type Post = {
  id: number;
  image_url: string;
  commentsCount: Array<{ count: number }>;
  likesCount: Array<{ count: number }>;
};

type GetUserPostsContext = QueryFunctionContext<ReturnType<typeof postKeys['profile']>>;

export const getUserPosts = async (ctx: GetUserPostsContext): Promise<Array<Post> | null> => {
  const [{ username }] = ctx.queryKey;

  const response = await supabase
    .from('posts')
    .select('id, image_url, commentsCount:comments(count), likesCount:likes(count))')
    .eq('user_username', username)
    .order('created_at', { ascending: false });

  assertResponseOk(response);

  return response.data;
};

export const useProfilePosts = () => {
  const router = useRouter();
  const username = router.query.username as string;

  return useQuery(postKeys.profile(username), getUserPosts);
};
