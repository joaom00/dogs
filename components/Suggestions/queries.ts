import { type QueryFunctionContext, useQuery } from 'react-query';

import { useUser } from '@context/AuthContext';
import { supabase } from '@lib/supabase';
import { assertResponseOk } from '@lib/apiError';
import { profileKeys } from '@lib/queryFactory';

type User = {
  id: string;
  avatar_url: string;
  username: string;
};

type GetUsersContext = QueryFunctionContext<ReturnType<typeof profileKeys['suggestion']>>;

const getUsers = async (ctx: GetUsersContext): Promise<Array<User> | null> => {
  const [{ username }] = ctx.queryKey;

  const response = await supabase
    .from('profiles')
    .select('id, avatar_url, username')
    .not('username', 'eq', username)
    .range(0, 2, { foreignTable: 'posts' });

  assertResponseOk(response);

  return response.data;
};

export const useUserSuggestions = () => {
  const { user } = useUser();

  return useQuery(profileKeys.suggestion(user?.user_metadata.username), getUsers);
};
