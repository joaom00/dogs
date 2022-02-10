import { useRouter } from 'next/router';
import { QueryFunctionContext, useMutation, useQuery, useQueryClient } from 'react-query';

import { supabase } from '@/lib/supabase';
import { useUser } from '@/context/AuthContext';

type CustomKeys = Array<{
  scope: string;
  username: string;
}>;

/* -------------------------------------------------------------------------------------------------
 * useProfile
 * -----------------------------------------------------------------------------------------------*/

export type ProfileResponse = {
  name: string;
  username: string;
  avatar_url: string;
  bio: string;
  postsCount: Array<{ count: number }>;
  followersCount: Array<{ count: number }>;
  followingCount: Array<{ count: number }>;
  hasFollowed: boolean;
};

export const getProfile = async (
  username: string,
  followerUsername: string
): Promise<ProfileResponse> => {
  const profileResponse = await supabase
    .from('profiles')
    .select(
      'name, username, bio, avatar_url, postsCount:posts!user_username(count), followersCount:follows!followed_username(count), followingCount:follows!follower_username(count)'
    )
    .eq('username', username)
    .single();

  const hasFollowedResponse = await supabase
    .from('follows')
    .select('*', { count: 'exact' })
    .match({ follower_username: followerUsername, followed_username: username });

  return {
    ...profileResponse.data,
    hasFollowed: !!hasFollowedResponse.count,
  };
};

export const useProfile = () => {
  const router = useRouter();
  const username = router.query.username as string;
  const { user } = useUser();

  return useQuery(
    [{ scope: 'profile', type: 'detail', username }],
    () => getProfile(username, user?.user_metadata.username),
    {
      staleTime: Infinity,
    }
  );
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

export const useProfilePosts = () => {
  const router = useRouter();
  const username = router.query.username as string;

  return useQuery([{ scope: 'profile', type: 'posts', username }], getUserPosts, {
    staleTime: Infinity,
  });
};

/* -------------------------------------------------------------------------------------------------
 * useUploadFile
 * -----------------------------------------------------------------------------------------------*/

const uploadFile = async ({ file, username }: { file: File; username: string }) => {
  await supabase.storage.from(`avatars`).upload(`${username}-${file.name}`, file);

  const { publicURL } = supabase.storage.from(`avatars`).getPublicUrl(`${username}-${file.name}`);

  await supabase.from('profiles').update({ avatar_url: publicURL }).match({ username });
};

export const useUploadFile = () => {
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
