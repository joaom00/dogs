import { supabase } from '@/lib/supabase';
import type { GetServerSidePropsContext } from 'next';
import HomeTemplate from '../templates/Home';

export default function Home() {
  return <HomeTemplate />;
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

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
    props: {},
  };
}
