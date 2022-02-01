import { useUser } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { useQuery } from 'react-query';

export type PostResponse = {
  id: number;
  description: string;
  image_url: string;
  user_username: string;
  created_at: string;
  owner: {
    username: string;
    avatar_url: string;
  };
  commentsCount: Array<{ count: number }>;
  likesCount: Array<{ count: number }>;
};

export const getPosts = async (username: string): Promise<PostResponse[] | null> => {
  const followersRes = await supabase
    .from('follows')
    .select('followed_username')
    .eq('follower_username', username);

  const followers = followersRes.data?.map((follower) => follower.followed_username);

  const res = await supabase
    .from<PostResponse>('posts')
    .select(
      'id, description, image_url, created_at, owner:profiles!user_username(username, avatar_url), commentsCount:comments!post_id(count), likesCount:likes!post_id(count)'
    )
    .in('user_username', followers ?? []);

  return res.data;
};

export const usePostsQuery = () => {
  const { user } = useUser();
  return useQuery([{ scope: 'posts', type: 'feed' }], () => getPosts(user?.user_metadata.username));
};
