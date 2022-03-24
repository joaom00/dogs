import { type QueryFunctionContext, useMutation, useQuery } from 'react-query';

import { useUser } from '@context/AuthContext';
import { supabase } from '@lib/supabase';
import { profileKeys } from '@lib/queryFactory';
import { assertResponseOk } from '@lib/apiError';

/* -------------------------------------------------------------------------------------------------
 * useProfileEdit
 * -----------------------------------------------------------------------------------------------*/

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar_url: string;
  bio: string;
};

type GetProfileContext = QueryFunctionContext<ReturnType<typeof profileKeys['edit']>>;

export const getProfile = async (ctx: GetProfileContext) => {
  const [{ username }] = ctx.queryKey;

  if (!username) return;

  const response = await supabase.from<User>('profiles').select('*').eq('username', username);

  assertResponseOk(response);

  return response.data?.[0];
};

export const useProfileEdit = () => {
  const { user } = useUser();
  const username = user?.user_metadata.username;

  return useQuery(profileKeys.edit(username), getProfile);
};

/* -------------------------------------------------------------------------------------------------
 * useUpdateProfile
 * -----------------------------------------------------------------------------------------------*/

const updateProfile = async (data: Partial<User>) => {
  const response = await supabase.from<User>('profiles').upsert(data);

  assertResponseOk(response);

  return response.data?.[0];
};

export const useUpdateProfile = () => {
  return useMutation(updateProfile);
};
