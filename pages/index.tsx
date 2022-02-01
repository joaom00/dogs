import { supabase } from '@/lib/supabase';
import { getPosts } from '@/templates/Home/queries';
import type { GetServerSidePropsContext } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import HomeTemplate from '../templates/Home';

export default function HomePage() {
  return <HomeTemplate />;
}

export const getServerSideProps = async ({ req }: GetServerSidePropsContext) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([{ scope: 'profile', type: 'feed' }], getPosts);

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
