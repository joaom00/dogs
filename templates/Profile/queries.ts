import { useRouter } from 'next/router';
import { QueryFunctionContext, useMutation, useQuery, useQueryClient } from 'react-query';

import { supabase } from '@/lib/supabase';

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

export const getProfile = async ({
  queryKey: [{ username }],
}: QueryFunctionContext<CustomKeys>): Promise<ProfileResponse> => {
  const res = await supabase
    .from('profiles')
    .select(
      'name, username, bio, avatar_url, postsCount:posts!user_id(count), followersCount:follows!followed_username(count), followingCount:follows!follower_username(count), posts:posts!user_id(id, image_url, comments:comments(count), likes:likes(count))'
    )
    .eq('username', username)
    .order('created_at', { foreignTable: 'posts.created_at', ascending: false })
    .single();

  return res.data;
};

export const useProfileQuery = () => {
  const router = useRouter();
  const username = router.query.username as string;

  return useQuery([{ scope: 'profile', username }], getProfile, { staleTime: Infinity });
};

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
