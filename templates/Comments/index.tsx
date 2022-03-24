import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useUser } from '@/context/AuthContext';

import { ArrowLeftIcon } from '@/icons';
import { Avatar } from '@components/Avatar';
import { Spinner } from '@components/Spinner';
import { useAddComment, useComments, usePost } from '@components/PostDialog/queries';

import * as S from './styles';

const Comments = () => {
  const { user } = useUser();
  const router = useRouter();
  const postId = Number(router.query.postId);

  const post = usePost(postId);
  const comments = useComments(postId);
  const addComment = useAddComment();

  const [content, setContent] = React.useState('');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!content.trim()) return;

    addComment.mutate(
      { content, postId, userId: user?.id as string },
      {
        onSuccess: () => {
          setContent('');
        },
      }
    );
  };

  return (
    <>
      <S.CommentsHeaderWrapper>
        <S.CommentsHeader>
          <button aria-label="Voltar" onClick={() => router.back()}>
            <ArrowLeftIcon size={24} />
          </button>
          <span>Comentários</span>
        </S.CommentsHeader>
        <S.FormWrapper onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Adicione um comentário..."
            autoComplete="off"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <S.SendButton>Publicar</S.SendButton>
        </S.FormWrapper>
      </S.CommentsHeaderWrapper>

      {post.isSuccess && (
        <S.PostContentDescription>
          <Link href={`/${post.data?.user.username}`}>
            <a>
              <Avatar
                src={post.data?.user.avatar_url}
                alt={`Foto de perfil de ${post.data?.user.username}`}
                size={32}
              />
            </a>
          </Link>

          <p>
            <Link href={`/${post.data?.user.username}`}>
              <a>
                <strong>{post.data?.user.username}</strong>
              </a>
            </Link>{' '}
            {post.data?.description}
          </p>
        </S.PostContentDescription>
      )}

      {(post.isLoading || comments.isLoading) && (
        <S.SpinnerWrapper>
          <Spinner />
        </S.SpinnerWrapper>
      )}

      {post.isSuccess &&
        comments.isSuccess &&
        comments.data?.map((comment) => (
          <S.PostComment key={comment.id}>
            <Link href={`/${comment.user.username}`}>
              <a>
                <Avatar
                  src={comment.user.avatar_url}
                  alt={`Foto de perfil de ${comment.user.username}`}
                  size={32}
                />
              </a>
            </Link>

            <p>
              <Link href={`/${comment.user.username}`}>
                <a>
                  <strong>{comment.user.username}</strong>
                </a>
              </Link>{' '}
              {comment.content}
            </p>
          </S.PostComment>
        ))}
    </>
  );
};

export default Comments;
