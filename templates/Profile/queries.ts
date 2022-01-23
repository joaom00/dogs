import { supabase } from '@/lib/supabase';
import { QueryFunctionContext } from 'react-query';

type CustomKeys = Array<{
  scope: string;
  username: string;
}>;

type ProfileResponse = {
  name: string;
  username: string;
  avatar_url: string;
  bio: string;
  postsCount: Array<{ count: number }>;
  followersCount: Array<{ count: number }>;
  followingCount: Array<{ count: number }>;
  posts: Array<{
    id: string;
    image_url: string;
    comments: Array<{ count: number }>;
    likes: Array<{ count: number }>;
  }>;
};

export async function getProfile({
  queryKey: [{ username }],
}: QueryFunctionContext<CustomKeys>): Promise<ProfileResponse> {
  const res = await supabase
    .from('profiles')
    .select(
      'name, username, bio, avatar_url, postsCount:posts!user_id(count), followersCount:follows!followed_username(count), followingCount:follows!follower_username(count), posts:posts!user_id(id, image_url, comments:comments(count), likes:likes(count))'
    )
    .eq('username', username)
    .order('created_at', { foreignTable: 'posts.created_at', ascending: false })
    .single();

  return res.data;
}
