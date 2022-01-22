import type { GetServerSidePropsContext } from 'next';

import { supabase } from '@/lib/supabase';

import SignInTemplate from '@/templates/SignIn';

export default function SignIn() {
  return <SignInTemplate />;
}

SignIn.withHeader = false;

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
