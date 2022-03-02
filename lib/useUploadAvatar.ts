import { useMutation, useQueryClient } from 'react-query';

import { useUser } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { ProfileResponse } from '@/templates/Profile/queries';

const uploadAvatar = async ({ file, username }: { file: File; username: string }) => {
  await supabase.storage.from(`avatars`).upload(`${username}-${file.name}`, file);

  const { publicURL } = supabase.storage.from(`avatars`).getPublicUrl(`${username}-${file.name}`);

  await supabase.from('profiles').update({ avatar_url: publicURL }).match({ username });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation(uploadAvatar, {
    onMutate: ({ file, username }) => {
      const key = [{ scope: 'profile', username }];

      const userLoggedData = queryClient.getQueryData<ProfileResponse>(key);

      queryClient.setQueryData(key, () => ({
        ...userLoggedData,
        avatar_url: URL.createObjectURL(file),
      }));

      queryClient.setQueryData(['avatar', user?.user_metadata.username], () => ({
        avatar_url: URL.createObjectURL(file),
      }));
    },
  });
};
