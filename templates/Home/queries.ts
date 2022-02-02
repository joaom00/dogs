import { useQuery } from 'react-query';

import { supabase } from '@/lib/supabase';

import { useUser } from '@/context/AuthContext';

export type PostResponse = {
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

export const getPosts = async (userId: string, username: string): Promise<PostResponse[]> => {
  const followersResponse = await supabase
    .from('follows')
    .select('followed_username')
    .eq('follower_username', username);

  if (!followersResponse.data?.length) return [] as PostResponse[];

  const followers = followersResponse.data.map((follower) => follower.followed_username);

  const postsResponse = await supabase
    .from<PostResponse>('posts')
    .select(
      'id, description, image_url, created_at, owner:profiles!user_username(username, avatar_url), commentsCount:comments!post_id(count), likesCount:likes!post_id(count)'
    )
    .in('user_username', followers)
    .order('created_at', { ascending: false });

  if (!postsResponse.data?.length) return [] as PostResponse[];

  for await (const post of postsResponse.data) {
    const likeResponse = await supabase
      .from('likes')
      .select('*', { count: 'exact' })
      .match({ post_id: post.id, user_id: userId });

    post.hasLiked = !!likeResponse.count;
  }

  return postsResponse.data;
};

export const usePostsQuery = () => {
  const { user } = useUser();

  return useQuery([{ scope: 'posts', type: 'feed' }], () =>
    getPosts(user?.id as string, user?.user_metadata.username)
  );
};
