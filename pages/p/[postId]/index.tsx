import { getPost } from '@/components/PostDialog/queries';
import { supabase } from '@/lib/supabase';
import Post from '@/templates/Post';
import type { GetServerSidePropsContext } from 'next';
import { dehydrate, QueryClient } from 'react-query';

const PostPage = () => {
  return <Post />;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext<{ postId: string }>) => {
  const { user } = await supabase.auth.api.getUserByCookie(ctx.req);
  const postId = Number(ctx.params?.postId);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([{ scope: 'post', type: 'detail', postId }], () =>
    getPost({ postId, userId: user?.id as string })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default PostPage;
