import { supabase } from '@/lib/supabase';
import ProfileTemplate from '@/templates/Profile';
import { GetServerSidePropsContext } from 'next';

type User = {
  name: string;
  username: string;
  avatar_url: string;
  bio: string;
  posts: Array<{
    id: string;
    image_url: string;
  }>;
};

export default function Profile({ user }: { user: User | null }) {
  return <ProfileTemplate user={user} />;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { username } = ctx.query;

  const res = await supabase
    .from('profiles')
    .select('name, username, bio, avatar_url, posts (id, image_url)')
    .match({ username })
    .order('created_at', { foreignTable: 'posts', ascending: false });

  return {
    props: {
      user: res.data?.length ? res.data[0] : null,
    },
  };
}
