import type { GetServerSidePropsContext } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import { supabase } from '@lib/supabase';
import { postKeys } from '@lib/queryFactory';

import { Home, getPosts } from '@templates/Home';

export default function HomePage() {
  return <Home />;
}

export const getServerSideProps = async ({ req }: GetServerSidePropsContext) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  const options = {
    userId: user?.id,
    username: user?.user_metadata.username,
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(postKeys.feed(options), getPosts);

  if (!user) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
