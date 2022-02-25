import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useUser } from '@/context/AuthContext';

import { ChatIcon, HeartIcon } from '@/icons';
import { PostDialog } from '@components/PostDialog';
import type { PostResponse } from '@/templates/Home/queries';

import { useAddLike, useDeleteLike } from './queries';

import * as S from './styles';

export const Post = ({ post }: { post: PostResponse }) => {
  const isMobile = /iPhone|iPad|Android/i.test(globalThis?.navigator?.userAgent);
  const router = useRouter();
  const returnHref = React.useRef(router.asPath);

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <S.Wrapper>
        <S.PostHeader>
          <Link href={post.owner.username}>
            <a>
              <img src={post.owner.avatar_url} alt={`Foto de perfil de ${post.owner.username}`} />
            </a>
          </Link>
          <Link href={post.owner.username}>
            <a>{post.owner.username}</a>
          </Link>
        </S.PostHeader>

        {isMobile ? (
          <Link href={`/p/${post.id}/comments`}>
            <a>
              <S.PostImage src={post.image_url} />
            </a>
          </Link>
        ) : (
          <Link href={`/?postId=${post.id}`} as={`/p/${post.id}`} shallow>
            <a onClick={() => setOpen(true)}>
              <S.PostImage src={post.image_url} />
            </a>
          </Link>
        )}

        <S.PostActions>
          {post.hasLiked ? <UnlikeButton postId={post.id} /> : <LikeButton postId={post.id} />}

          <Link href={`/?postId=${post.id}`} as={`/p/${post.id}`} shallow>
            <a>
              <ChatIcon onClick={() => setOpen(true)} size={24} />
            </a>
          </Link>
        </S.PostActions>

        <S.PostLikes>{post.likesCount[0].count} curtidas</S.PostLikes>

        <S.PostDescription>
          <strong>{post.owner.username}</strong> {post.description}
        </S.PostDescription>

        {isMobile ? (
          <Link href={`/p/${post.id}/comments`}>
            <a>
              <S.PostShowAllComments>
                Ver todos os {post.commentsCount[0].count} comentários
              </S.PostShowAllComments>
            </a>
          </Link>
        ) : (
          <Link href={`/?postId=${post.id}`} as={`/p/${post.id}`} shallow>
            <a>
              <S.PostShowAllComments onClick={() => setOpen(true)}>
                Ver todos os {post.commentsCount[0].count} comentários
              </S.PostShowAllComments>
            </a>
          </Link>
        )}

        <S.PostCreatedInfo>há 1 dia</S.PostCreatedInfo>
      </S.Wrapper>

      <PostDialog
        postId={post.id}
        returnHref={returnHref.current}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
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
