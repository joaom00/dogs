import { useMutation, useQueryClient } from 'react-query';

import { supabase } from '@/lib/supabase';

import type { PostDetailResponse } from '@/components/PostDialog/queries';
import type { PostResponse } from '@/templates/Home/queries';

/* -------------------------------------------------------------------------------------------------
 * useLikeMutation
 * -----------------------------------------------------------------------------------------------*/

type LikeData = {
  postId: number;
  userId: string;
};

const createLike = async ({ postId, userId }: LikeData) => {
  const res = await supabase.from('likes').insert({
    post_id: postId,
    user_id: userId,
  });

  return res.data;
};

export const useLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(createLike, {
    onMutate: ({ postId }) => {
      const previousPosts = queryClient.getQueryData<PostResponse[]>([
        { scope: 'posts', type: 'feed' },
      ]);

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

      queryClient.setQueryData([{ scope: 'posts', type: 'feed' }], posts);

      const postDetail = queryClient.getQueryData<PostDetailResponse>([
        { scope: 'post', type: 'detail', postId },
      ]);

      if (!postDetail) return;

      queryClient.setQueryData([{ scope: 'post', type: 'detail', postId }], () => ({
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
 * useUnlikeMutation
 * -----------------------------------------------------------------------------------------------*/

type UnlikeData = {
  postId: number;
  userId: string;
};

const deleteLike = async ({ postId, userId }: UnlikeData) => {
  const res = await supabase.from('likes').delete().match({ post_id: postId, user_id: userId });

  return res.data;
};

export const useUnlikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteLike, {
    onMutate: ({ postId }) => {
      const previousPosts = queryClient.getQueryData<PostResponse[]>([
        { scope: 'posts', type: 'feed' },
      ]);

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

      queryClient.setQueryData([{ scope: 'posts', type: 'feed' }], posts);

      const postDetail = queryClient.getQueryData<PostDetailResponse>([
        { scope: 'post', type: 'detail', postId },
      ]);

      if (!postDetail) return;

      queryClient.setQueryData([{ scope: 'post', type: 'detail', postId }], () => ({
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
