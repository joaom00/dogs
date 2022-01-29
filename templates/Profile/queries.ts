import { useRouter } from 'next/router';
import { QueryFunctionContext, useMutation, useQuery, useQueryClient } from 'react-query';

import { supabase } from '@/lib/supabase';

type CustomKeys = Array<{
  scope: string;
  username: string;
}>;

/* -------------------------------------------------------------------------------------------------
 * useProfileQuery
 * -----------------------------------------------------------------------------------------------*/

export type ProfileResponse = {
  name: string;
  username: string;
  avatar_url: string;
  bio: string;
  postsCount: Array<{ count: number }>;
  followersCount: Array<{ count: number }>;
  followingCount: Array<{ count: number }>;
};

export const getProfile = async ({
  queryKey,
}: QueryFunctionContext<CustomKeys>): Promise<ProfileResponse> => {
  const [{ username }] = queryKey;

  const res = await supabase
    .from('profiles')
    .select(
      'name, username, bio, avatar_url, postsCount:posts!user_username(count), followersCount:follows!followed_username(count), followingCount:follows!follower_username(count)'
    )
    .eq('username', username)
    .single();

  return res.data;
};

export const useProfileQuery = () => {
  const router = useRouter();
  const username = router.query.username as string;

  return useQuery([{ scope: 'profile', type: 'detail', username }], getProfile, {
    staleTime: Infinity,
  });
};

/* -------------------------------------------------------------------------------------------------
 * useUserPosts
 * -----------------------------------------------------------------------------------------------*/

type UserPostsResponse = Array<{
  id: number;
  image_url: string;
  commentsCount: Array<{ count: number }>;
  likesCount: Array<{ count: number }>;
}>;

export const getUserPosts = async ({
  queryKey,
}: QueryFunctionContext<CustomKeys>): Promise<UserPostsResponse | null> => {
  const [{ username }] = queryKey;

  const res = await supabase
    .from('posts')
    .select('id, image_url, commentsCount:comments(count), likesCount:likes(count))')
    .eq('user_username', username)
    .order('created_at', { ascending: false });

  return res.data;
};

export const useUserPosts = () => {
  const router = useRouter();
  const username = router.query.username as string;

  return useQuery([{ scope: 'profile', type: 'posts', username }], getUserPosts, {
    staleTime: Infinity,
  });
};

/* -------------------------------------------------------------------------------------------------
 * useUploadFileMutation
 * -----------------------------------------------------------------------------------------------*/

const uploadFile = async ({ file, username }: { file: File; username: string }) => {
  await supabase.storage.from(`avatars`).upload(`${username}-${file.name}`, file);

  const { publicURL } = supabase.storage.from(`avatars`).getPublicUrl(`${username}-${file.name}`);

  await supabase.from('profiles').update({ avatar_url: publicURL }).match({ username });
};

export const useUploadFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(uploadFile, {
    onMutate: ({ file, username }) => {
      const key = [{ scope: 'profile', username }];

      const userLoggedData = queryClient.getQueryData<ProfileResponse>(key);

      queryClient.setQueryData(key, () => ({
        ...userLoggedData,
        avatar_url: URL.createObjectURL(file),
      }));

      queryClient.setQueryData(['header_image'], () => ({
        avatar_url: URL.createObjectURL(file),
      }));
    },
  });
};
