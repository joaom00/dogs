import { useUser } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { QueryFunctionContext, useMutation, useQuery, useQueryClient } from 'react-query';

type CustomKeys = Array<{
  scope: string;
  type: string;
  postId: number;
  userId?: string;
}>;

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

export const getPost = async ({ postId, userId }: { postId: number; userId: string }) => {
  if (!postId) return;

  const postResponse = await supabase
    .from<PostResponse>('posts')
    .select(
      'id, image_url, description, created_at, commentsCount:comments(count), likesCount:likes(count), user:user_username(id, username, avatar_url)'
    )
    .eq('id', postId)
    .single();

  if (postResponse.error) {
    throw new Error('Publicação não existe');
  }

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

  return useQuery([{ scope: 'post', type: 'detail', postId }], () => getPost({ postId, userId }), {
    enabled: open,
  });
};

/* -------------------------------------------------------------------------------------------------
 * useComments
 * -----------------------------------------------------------------------------------------------*/

type CommentsResponse = {
  id: number;
  post_id: number;
  content: string;
  created_at: string;
  user: {
    username: string;
    avatar_url: string;
  };
};

const getComments = async ({ queryKey }: QueryFunctionContext<CustomKeys>) => {
  const [{ postId }] = queryKey;

  if (!postId) return;

  const commentsResponse = await supabase
    .from<CommentsResponse>('comments')
    .select('id, content, user:user_id(username, avatar_url)')
    .eq('post_id', postId)
    .order('created_at', { ascending: false });

  if (!!commentsResponse.error) {
    throw new Error('Não foi possível buscar os comentários');
  }

  return commentsResponse.data;
};

export const useComments = (postId: number, open?: boolean) => {
  return useQuery([{ scope: 'post', type: 'comments', postId }], getComments, {
    enabled: open,
  });
};

/* -------------------------------------------------------------------------------------------------
 * useAddComment
 * -----------------------------------------------------------------------------------------------*/

type CreateCommentData = {
  content: string;
  postId: number;
  userId: string;
};

const createComment = async ({ content, postId, userId }: CreateCommentData) => {
  const res = await supabase.from('comments').insert({
    content,
    post_id: postId,
    user_id: userId,
  });

  return res.data;
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation(createComment, {
    onSuccess: (_data, { postId }) =>
      queryClient.invalidateQueries([{ scope: 'post', type: 'comments', postId }]),
  });
};

/* -------------------------------------------------------------------------------------------------
 * useAddLike
 * -----------------------------------------------------------------------------------------------*/

type CreateLikeData = {
  postId: number;
  userId: string;
};

const createLike = async ({ postId, userId }: CreateLikeData) => {
  const res = await supabase.from('likes').insert({
    post_id: postId,
    user_id: userId,
  });

  return res.data;
};

export const useAddLike = () => {
  const queryClient = useQueryClient();

  return useMutation(createLike, {
    onMutate: ({ postId }) => {
      const postDetail = queryClient.getQueryData<PostResponse>([
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
 * useDeleteLike
 * -----------------------------------------------------------------------------------------------*/

type DeleteLikeData = {
  postId: number;
  userId: string;
};

const deleteLike = async ({ postId, userId }: DeleteLikeData) => {
  const res = await supabase.from('likes').delete().match({ post_id: postId, user_id: userId });

  return res.data;
};

export const useDeleteLike = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteLike, {
    onMutate: ({ postId }) => {
      const postDetail = queryClient.getQueryData<PostResponse>([
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
