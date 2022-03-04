import { useUser } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { QueryFunctionContext, useMutation, useQuery } from 'react-query';

type QueryKey = {
  scope: string;
  type: string;
  username: string;
}[];

type UserResponse = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar_url: string;
  bio: string;
};

export const getProfile = async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
  const [{ username }] = queryKey;

  const response = await supabase
    .from<UserResponse>('profiles')
    .select('*')
    .eq('username', username);

  if (!!response.error) {
    return {} as UserResponse;
  }

  return response.data[0];
};

export const useProfileEdit = () => {
  const { user } = useUser();
  const username = user?.user_metadata.username;

  return useQuery([{ scope: 'profile', type: 'edit', username }], getProfile);
};

const updateProfile = async (data: Partial<UserResponse>) => {
  const profileResponse = await supabase.from<UserResponse>('profiles').upsert(data);

  if (!!profileResponse.error) {
    throw new Error('Não foi possível atualizar seu perfil');
  }

  return profileResponse.data[0];
};

export const useUpdateProfile = () => {
  return useMutation(updateProfile);
};
