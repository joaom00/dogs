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
 * usePostDetailQuery
 * -----------------------------------------------------------------------------------------------*/

export type PostDetailResponse = {
  id: number;
  image_url: string;
  description: string;
  likesCount: Array<{ count: number }>;
  hasLiked: boolean;
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
  };
};

const getPostDetail = async ({ postId, userId }: { postId: number; userId: string }) => {
  const postResponse = await supabase
    .from<PostDetailResponse>('posts')
    .select(
      'id, image_url, description, created_at, likesCount:likes(count), user:user_username(id, username, avatar_url)'
    )
    .eq('id', postId)
    .single();

  const likeResponse = await supabase
    .from('likes')
    .select('*', { count: 'exact' })
    .match({ post_id: postId, user_id: userId });

  return {
    ...postResponse.data,
    hasLiked: !!likeResponse.count,
  };
};

export const usePostDetailQuery = (postId: number, open: boolean) => {
  const { user } = useUser();
  const userId = user?.id as string;

  return useQuery(
    [{ scope: 'post', type: 'detail', postId }],
    () => getPostDetail({ postId, userId }),
    {
      enabled: open,
    }
  );
};

/* -------------------------------------------------------------------------------------------------
 * usePostCommentsQuery
 * -----------------------------------------------------------------------------------------------*/

type PostCommentsResponse = {
  id: number;
  post_id: number;
  content: string;
  created_at: string;
  user: {
    username: string;
    avatar_url: string;
  };
};

const getPostComments = async ({ queryKey }: QueryFunctionContext<CustomKeys>) => {
  const [{ postId }] = queryKey;

  const res = await supabase
    .from<PostCommentsResponse>('comments')
    .select('id, content, user:user_id(username, avatar_url)')
    .eq('post_id', postId)
    .order('created_at', { ascending: false });

  return res.data;
};

export const usePostCommentsQuery = (postId: number, open: boolean) => {
  return useQuery([{ scope: 'post', type: 'comments', postId }], getPostComments, {
    enabled: open,
  });
};

/* -------------------------------------------------------------------------------------------------
 * useCommentMutation
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

export const useCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(createComment, {
    onSuccess: (_data, { postId }) =>
      queryClient.invalidateQueries([{ scope: 'post', type: 'comments', postId }]),
  });
};

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
