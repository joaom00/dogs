import { type QueryFunctionContext, useMutation, useQuery, useQueryClient } from 'react-query';

import { useUser } from '@context/AuthContext';
import { supabase } from '@lib/supabase';
import { type PostDetailOptions, postKeys } from '@lib/queryFactory';
import { assertResponseOk } from '@lib/apiError';

/* -------------------------------------------------------------------------------------------------
 * usePost
 * -----------------------------------------------------------------------------------------------*/

export type PostResponse = {
  id: number;
  image_url: string;
  description: string;
  commentsCount: Array<{ count: number }>;
  likesCount: Array<{ count: number }>;
  hasLiked: boolean;
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
  };
};

type GetPostContext = QueryFunctionContext<ReturnType<typeof postKeys['detail']>>;

export const getPost = async (ctx: GetPostContext) => {
  const [{ postId, userId }] = ctx.queryKey;

  if (!postId) return;

  const postResponse = await supabase
    .from<PostResponse>('posts')
    .select(
      'id, image_url, description, created_at, commentsCount:comments(count), likesCount:likes(count), user:user_username(id, username, avatar_url)'
    )
    .eq('id', postId)
    .single();

  assertResponseOk(postResponse);

  const likeResponse = await supabase
    .from('likes')
    .select('*', { count: 'exact' })
    .match({ post_id: postId, user_id: userId });

  return {
    ...postResponse.data,
    hasLiked: !!likeResponse.count,
  };
};

export const usePost = (postId: number, open?: boolean) => {
  const { user } = useUser();
  const userId = user?.id as string;

  const options: PostDetailOptions = {
    postId,
    userId,
  };

  return useQuery(postKeys.detail(options), getPost, {
    enabled: open,
  });
};

/* -------------------------------------------------------------------------------------------------
 * useComments
 * -----------------------------------------------------------------------------------------------*/

type Comment = {
  id: number;
  post_id: number;
  content: string;
  created_at: string;
  user: {
    username: string;
    avatar_url: string;
  };
};

type GetCommentsContext = QueryFunctionContext<ReturnType<typeof postKeys['comment']>>;

const getComments = async (ctx: GetCommentsContext) => {
  const [{ postId }] = ctx.queryKey;

  if (!postId) return;

  const response = await supabase
    .from<Comment>('comments')
    .select('id, content, user:user_id(username, avatar_url)')
    .eq('post_id', postId)
    .order('created_at', { ascending: false });

  assertResponseOk(response);

  return response.data;
};

export const useComments = (postId: number, open?: boolean) => {
  return useQuery(postKeys.comment(postId), getComments, {
    enabled: open,
  });
};

/* -------------------------------------------------------------------------------------------------
 * useAddComment
 * -----------------------------------------------------------------------------------------------*/

type CreateCommentPayload = {
  content: string;
  postId: number;
  userId: string;
};

const createComment = async ({ content, postId, userId }: CreateCommentPayload) => {
  const response = await supabase.from('comments').insert({
    content,
    post_id: postId,
    user_id: userId,
  });

  assertResponseOk(response);

  return response.data;
};

export const useAddComment = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation(createComment, {
    onMutate: ({ postId, content }) => {
      const oldComments = queryClient.getQueryData(postKeys.comment(postId)) as Array<Comment>;

      const avatar_url = queryClient.getQueryData(['avatar', user?.user_metadata.username]);

      const newComment = {
        id: new Date().getTime(),
        content,
        user: {
          username: user?.user_metadata.username,
          avatar_url: avatar_url,
        },
      };

      queryClient.setQueryData(postKeys.comment(postId), [newComment, ...oldComments]);
    },
    onSuccess: (_data, { postId }) => queryClient.invalidateQueries(postKeys.comment(postId)),
  });
};

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
    onMutate: (variables) => {
      const key = postKeys.detail(variables);

      const postDetail = queryClient.getQueryData<PostResponse>(key);

      if (!postDetail) return;

      queryClient.setQueryData(key, () => ({
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
    onMutate: (variables) => {
      const key = postKeys.detail(variables);

      const postDetail = queryClient.getQueryData<PostResponse>(key);

      if (!postDetail) return;

      queryClient.setQueryData(key, () => ({
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
