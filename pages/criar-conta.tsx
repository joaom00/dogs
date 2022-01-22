import type { GetServerSidePropsContext } from 'next';

import { supabase } from '@/lib/supabase';

import SignUpTemplate from '@/templates/SignUp';

export default function SignUp() {
  return <SignUpTemplate />;
}

SignUp.withHeader = false;

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
