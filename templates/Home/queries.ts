import { type QueryFunctionContext, useQuery } from 'react-query';

import { useUser } from '@/context/AuthContext';
import { supabase } from '@lib/supabase';
import { type PostFeedOptions, postKeys } from '@lib/queryFactory';
import { assertResponseOk } from '@lib/apiError';

/* -------------------------------------------------------------------------------------------------
 * usePosts
 * -----------------------------------------------------------------------------------------------*/

export type Post = {
  id: number;
  description: string;
  image_url: string;
  user_username: string;
  hasLiked: boolean;
  created_at: string;
  owner: {
    username: string;
    avatar_url: string;
  };
  commentsCount: Array<{ count: number }>;
  likesCount: Array<{ count: number }>;
};

type GetPostsContext = QueryFunctionContext<ReturnType<typeof postKeys['feed']>>;

export const getPosts = async (ctx: GetPostsContext): Promise<Array<Post>> => {
  const [{ userId, username }] = ctx.queryKey;

  const followersResponse = await supabase
    .from('follows')
    .select('followed_username')
    .eq('follower_username', username);

  assertResponseOk(followersResponse);

  if (!followersResponse.data?.length) return [] as Post[];

  const followers = followersResponse.data.map((follower) => follower.followed_username);

  const postsResponse = await supabase
    .from<Post>('posts')
    .select(
      'id, description, image_url, created_at, owner:profiles!user_username(username, avatar_url), commentsCount:comments!post_id(count), likesCount:likes!post_id(count)'
    )
    .in('user_username', followers)
    .order('created_at', { ascending: false });

  assertResponseOk(postsResponse);

  if (!postsResponse.data?.length) return [] as Post[];

  for await (const post of postsResponse.data) {
    const likeResponse = await supabase
      .from('likes')
      .select('*', { count: 'exact' })
      .match({ post_id: post.id, user_id: userId });

    post.hasLiked = !!likeResponse.count;
  }

  return postsResponse.data;
};

export const usePosts = () => {
  const { user } = useUser();

  const options: PostFeedOptions = {
    userId: user?.id,
    username: user?.user_metadata.username,
  };

  return useQuery(postKeys.feed(options), getPosts);
};
