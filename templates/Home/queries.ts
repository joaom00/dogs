import { supabase } from '@/lib/supabase';
import { useQuery } from 'react-query';

export type PostResponse = {
  id: number;
  description: string;
  image_url: string;
  created_at: string;
  owner: {
    username: string;
    avatar_url: string;
  };
  commentsCount: Array<{ count: number }>;
  likesCount: Array<{ count: number }>;
};

export const getPosts = async (): Promise<PostResponse[] | null> => {
  const res = await supabase
    .from<PostResponse>('posts')
    .select(
      'id, description, image_url, created_at, owner:profiles!user_id(username, avatar_url), commentsCount:comments!post_id(count), likesCount:likes!post_id(count)'
    );

  return res.data;
};

export const usePostsQuery = () => {
  return useQuery([{ scope: 'posts', type: 'feed' }], getPosts);
};
