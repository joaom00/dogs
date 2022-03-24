import { useMutation, useQueryClient } from 'react-query';

import { supabase } from '@lib/supabase';
import { assertResponseOk } from '@lib/apiError';
import { postKeys } from '@lib/queryFactory';

import type { PostResponse as PostDialogResponse } from '@components/PostDialog/queries';
import type { Post } from '@templates/Home';

/* -------------------------------------------------------------------------------------------------
 * useAddLike
 * -----------------------------------------------------------------------------------------------*/

type CreateLikePayload = {
  postId: number;
  userId: string;
};

const createLike = async ({ postId, userId }: CreateLikePayload) => {
  const response = await supabase.from('likes').insert({
    post_id: postId,
    user_id: userId,
  });

  assertResponseOk(response);

  return response.data;
};

export const useAddLike = () => {
  const queryClient = useQueryClient();

  return useMutation(createLike, {
    onMutate: ({ postId }) => {
      const previousPosts = queryClient.getQueryData<Array<Post>>(postKeys.feed());

      if (!previousPosts) return;

      const posts = previousPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              hasLiked: !post.hasLiked,
              likesCount: [{ count: post.likesCount[0].count + 1 }],
            }
          : post
      );

      queryClient.setQueryData(postKeys.feed(), posts);

      const postDetail = queryClient.getQueryData<PostDialogResponse>(postKeys.detail({ postId }));

      if (!postDetail) return;

      queryClient.setQueryData(postKeys.detail({ postId }), () => ({
        ...postDetail,
        hasLiked: !postDetail.hasLiked,
        likesCount: [
          {
            count: postDetail.likesCount[0].count + 1,
          },
        ],
      }));
    },
  });
};

/* -------------------------------------------------------------------------------------------------
 * useDeleteLike
 * -----------------------------------------------------------------------------------------------*/

type DeleteLikePayload = {
  postId: number;
  userId: string;
};

const deleteLike = async ({ postId, userId }: DeleteLikePayload) => {
  const response = await supabase
    .from('likes')
    .delete()
    .match({ post_id: postId, user_id: userId });

  assertResponseOk(response);

  return response.data;
};

export const useDeleteLike = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteLike, {
    onMutate: ({ postId }) => {
      const previousPosts = queryClient.getQueryData<Array<Post>>(postKeys.feed());

      if (!previousPosts) return;

      const posts = previousPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              hasLiked: !post.hasLiked,
              likesCount: [{ count: post.likesCount[0].count - 1 }],
            }
          : post
      );

      queryClient.setQueryData(postKeys.feed(), posts);

      const postDetail = queryClient.getQueryData<PostDialogResponse>(postKeys.detail({ postId }));

      if (!postDetail) return;

      queryClient.setQueryData(postKeys.detail({ postId }), () => ({
        ...postDetail,
        hasLiked: !postDetail.hasLiked,
        likesCount: [
          {
            count: postDetail.likesCount[0].count - 1,
          },
        ],
      }));
    },
  });
};
