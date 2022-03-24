import type { GetServerSidePropsContext } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import { supabase } from '@lib/supabase';
import { type PostDetailOptions, postKeys } from '@lib/queryFactory';

import { getPost } from '@components/PostDialog/queries';
import Post from '@templates/Post';

const PostPage = () => {
  return <Post />;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext<{ postId: string }>) => {
  const { user } = await supabase.auth.api.getUserByCookie(ctx.req);
  const postId = Number(ctx.params?.postId);

  const options: PostDetailOptions = {
    postId,
    userId: user?.id,
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(postKeys.detail(options), getPost);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default PostPage;
