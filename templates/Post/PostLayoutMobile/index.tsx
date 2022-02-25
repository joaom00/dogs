import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useUser } from '@/context/AuthContext';

import { ChatIcon, HeartIcon } from '@/icons';
import { usePost, useAddLike, useDeleteLike } from '@components/PostDialog/queries';

import * as S from './styles';

const PostLayoutMobile = () => {
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const postId = Number(router.query.postId);

  const post = usePost(postId);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return (
      <S.PostMobile>
        <S.PostHeader>
          <img
            src={post.data?.user?.avatar_url}
            alt={`Foto de perfil de ${post.data?.user?.username}`}
          />
          <a>{post.data?.user?.username}</a>
        </S.PostHeader>

        <S.PostImage src={post.data?.image_url} />

        <S.PostActions>
          {post.data?.hasLiked ? <UnlikeButton postId={postId} /> : <LikeButton postId={postId} />}

          <ChatIcon size={24} />
        </S.PostActions>

        <S.PostLikes>{post.data?.likesCount?.[0].count} curtidas</S.PostLikes>

        <S.PostDescription>
          <strong>{post.data?.user?.username}</strong> {post.data?.description}
        </S.PostDescription>

        <Link href={`/p/${postId}/comments`} passHref>
          <S.PostShowAllComments>
            Ver todos os {post.data?.commentsCount?.[0].count} comentários
          </S.PostShowAllComments>
        </Link>
        <S.PostCreatedInfo>há 1 dia</S.PostCreatedInfo>
      </S.PostMobile>
    );
  }

  return <div />;
};

const LikeButton = ({ postId }: { postId: number }) => {
  const { user } = useUser();
  const addLike = useAddLike();

  const handleClick = () => {
    addLike.mutate({ postId, userId: user?.id as string });
  };

  return (
    <button onClick={handleClick}>
      <HeartIcon size={24} />
    </button>
  );
};

const UnlikeButton = ({ postId }: { postId: number }) => {
  const { user } = useUser();
  const deleteLike = useDeleteLike();

  const handleClick = () => {
    deleteLike.mutate({ postId, userId: user?.id as string });
  };

  return (
    <button onClick={handleClick}>
      <HeartIcon fill="red" stroke="red" size={24} />
    </button>
  );
};

export default PostLayoutMobile;
