import { useUser } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { useQuery } from 'react-query';

type UsersResponse = {
  id: string;
  avatar_url: string;
  username: string;
};

const getUsers = async (username: string): Promise<UsersResponse[] | null> => {
  const usersResponse = await supabase
    .from('profiles')
    .select('id, avatar_url, username')
    .not('username', 'eq', username)
    .range(0, 2, { foreignTable: 'posts' });

  return usersResponse.data;
};

export const useUsersQuery = () => {
  const { user } = useUser();

  return useQuery([{ scope: 'suggestions', username: user?.user_metadata.username }], () =>
    getUsers(user?.user_metadata.username as string)
  );
};
