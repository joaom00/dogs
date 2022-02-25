import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactTimeAgo from 'react-time-ago';

import { ChatIcon, HeartIcon } from '@/icons';
import { Spinner } from '@components/Spinner';
import { Avatar, AvatarFallback } from '@components/Avatar';
import {
  useAddLike,
  useDeleteLike,
  useComments,
  useAddComment,
  usePost,
} from '@components/PostDialog/queries';

import { useUser } from '@/context/AuthContext';

import * as S from './styles';

const PostLayoutDesktop = () => {
  const { user } = useUser();
  const router = useRouter();
  const postId = Number(router.query.postId);
  const [content, setContent] = React.useState('');

  const post = usePost(postId);
  const comments = useComments(postId);
  const addComment = useAddComment();

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

  if (post.isError) {
    return (
      <S.NotFound>
        <h2>Esta página não está disponível.</h2>
        <p>
          O link que você acessou pode estar quebrado ou a página pode ter sido removida.{' '}
          <Link href="/">
            <a>Voltar para o início.</a>
          </Link>
        </p>
      </S.NotFound>
    );
  }

  if (post.isSuccess) {
    return (
      <S.PostDesktop>
        <S.PostImage>
          {post.data?.image_url && (
            <img src={post.data.image_url} alt={`Publicação de ${post.data.user.username}`} />
          )}
        </S.PostImage>

        <S.PostContent>
          {post.isLoading || comments.isLoading ? (
            <S.SpinnerWrapper>
              <Spinner />
            </S.SpinnerWrapper>
          ) : (
            <>
              <S.PostContentHeader>
                <Link href={`/${post.data?.user.username}`}>
                  <a>
                    <Avatar>
                      <S.PostContentHeaderImage
                        src={post.data?.user.avatar_url}
                        alt={`Foto de perfil de ${post.data?.user.username}`}
                      />
                      <AvatarFallback>
                        <S.PostContentHeaderImageFallback />
                      </AvatarFallback>
                    </Avatar>
                  </a>
                </Link>

                <Link href={`/${post.data?.user.username}`}>
                  <a>
                    <p>{post.data?.user.username}</p>
                  </a>
                </Link>
              </S.PostContentHeader>

              <S.PostContentComments>
                <S.PostContentDescription>
                  <Link href={`/${post.data?.user.username}`}>
                    <a>
                      <Avatar>
                        <S.PostContentHeaderImage
                          src={post.data?.user.avatar_url}
                          alt={`Foto de perfil de ${post.data?.user.username}`}
                        />
                        <AvatarFallback>
                          <S.PostContentHeaderImageFallback />
                        </AvatarFallback>
                      </Avatar>
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

                {comments.data?.map((comment) => (
                  <S.PostContentDescription key={comment.id}>
                    <Link href={`/${comment.user.username}`}>
                      <a>
                        <Avatar>
                          <S.PostContentHeaderImage
                            src={comment.user.avatar_url}
                            alt={`Foto de perfil de ${comment.user.username}`}
                          />
                          <AvatarFallback>
                            <S.PostContentHeaderImageFallback />
                          </AvatarFallback>
                        </Avatar>
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
                  </S.PostContentDescription>
                ))}
              </S.PostContentComments>

              <S.PostContentActions>
                {post.data?.hasLiked ? (
                  <UnlikeButton postId={postId} />
                ) : (
                  <LikeButton postId={postId} />
                )}

                <label htmlFor="comment">
                  <ChatIcon size={24} />
                </label>

                <S.PostLikes>{post.data?.likesCount?.[0].count} curtidas</S.PostLikes>

                <S.PostDate>
                  <ReactTimeAgo date={new Date(post.data?.created_at as string)} />
                </S.PostDate>
              </S.PostContentActions>

              <S.PostCommentForm onSubmit={onSubmit}>
                <input
                  id="comment"
                  placeholder="Adicione um comentário..."
                  autoComplete="off"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                />
                <S.SubmitButton disabled={addComment.isLoading}>
                  {addComment.isLoading && <Spinner />}
                  Publicar
                </S.SubmitButton>
              </S.PostCommentForm>
            </>
          )}
        </S.PostContent>
      </S.PostDesktop>
    );
  }

  return <Spinner />;
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

export default PostLayoutDesktop;
