import type { GetServerSidePropsContext } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import { supabase } from '@/lib/supabase';
import HomeTemplate from '../templates/Home';
import { getPosts } from '@/templates/Home/queries';

export default function HomePage() {
  return <HomeTemplate />;
}

export const getServerSideProps = async ({ req }: GetServerSidePropsContext) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([{ scope: 'posts', type: 'feed' }], () =>
    getPosts(user?.id as string, user?.user_metadata.username)
  );

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
