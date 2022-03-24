import { useMutation, useQueryClient } from 'react-query';

import { supabase } from '@lib/supabase';
import { profileKeys } from '@lib/queryFactory';
import { assertResponseOk } from '@lib/apiError';

type AddFollowPayload = {
  followerUsername: string;
  followedUsername: string;
};

const addFollow = async ({ followerUsername, followedUsername }: AddFollowPayload) => {
  const response = await supabase.from('follows').insert([
    {
      follower_username: followerUsername,
      followed_username: followedUsername,
    },
  ]);
  assertResponseOk(response);
  return response.data;
};
export const useAddFollow = () => {
  const queryClient = useQueryClient();

  return useMutation(addFollow, {
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(profileKeys.follow('followers', variables.followedUsername));
      queryClient.invalidateQueries(profileKeys.detail(variables));
    },
  });
};
