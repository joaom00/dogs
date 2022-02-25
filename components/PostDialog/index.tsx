import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactTimeAgo from 'react-time-ago';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { useUser } from '@/context/AuthContext';

import { ChatIcon, CloseIcon, HeartIcon } from '@/icons';
import { Spinner } from '@components/Spinner';
import { Avatar, AvatarFallback } from '@/components/Avatar';

import { usePost, useComments, useAddComment, useAddLike, useDeleteLike } from './queries';

import * as S from './styles';

type PostDialogProps = {
  postId: number;
  returnHref?: string;
} & DialogPrimitive.DialogProps;

export const PostDialog: React.FC<PostDialogProps> = ({
  children,
  postId,
  returnHref,
  ...props
}) => {
  const { user } = useUser();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState('');

  const post = usePost(postId, props.open ?? open);
  const comments = useComments(postId, props.open ?? open);
  const addComment = useAddComment();

  const onSubmit = (event: React.MouseEvent) => {
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
    <DialogPrimitive.Root open={open} onOpenChange={setOpen} {...props}>
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <S.DialogOverlay>
          <S.DialogContent
            onCloseAutoFocus={() => router.push(returnHref ?? '', undefined, { shallow: true })}
          >
            <S.PostImage>
              {post.data?.image_url && (
                <img src={post.data.image_url} alt={`Publicação de ${post.data?.user?.username}`} />
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
                    <Link href={`/${post.data?.user?.username}`}>
                      <a>
                        <Avatar>
                          <S.PostContentHeaderImage
                            src={post.data?.user?.avatar_url}
                            alt={`Foto de perfil de ${post.data?.user?.username}`}
                          />
                          <AvatarFallback>
                            <S.PostContentHeaderImageFallback />
                          </AvatarFallback>
                        </Avatar>
                      </a>
                    </Link>

                    <Link href={`/${post.data?.user?.username}`}>
                      <a>
                        <p>{post.data?.user?.username}</p>
                      </a>
                    </Link>
                  </S.PostContentHeader>

                  <S.PostContentComments>
                    <S.PostContentDescription>
                      <Link href={`/${post.data?.user?.username}`}>
                        <a>
                          <Avatar>
                            <S.PostContentHeaderImage
                              src={post.data?.user?.avatar_url}
                              alt={`Foto de perfil de ${post.data?.user?.username}`}
                            />
                            <AvatarFallback>
                              <S.PostContentHeaderImageFallback />
                            </AvatarFallback>
                          </Avatar>
                        </a>
                      </Link>

                      <p>
                        <Link href={`/${post.data?.user?.username}`}>
                          <a>
                            <strong>{post.data?.user?.username}</strong>
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

                  <S.PostCommentForm>
                    <input
                      id="comment"
                      placeholder="Adicione um comentário..."
                      autoComplete="off"
                      value={content}
                      onChange={(event) => setContent(event.target.value)}
                    />
                    <S.SubmitButton
                      onClick={onSubmit}
                      type="submit"
                      disabled={addComment.isLoading}
                    >
                      {addComment.isLoading && <Spinner />}
                      Publicar
                    </S.SubmitButton>
                  </S.PostCommentForm>
                </>
              )}
            </S.PostContent>
          </S.DialogContent>

          <S.DialogClose>
            <CloseIcon size={32} />
          </S.DialogClose>
        </S.DialogOverlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
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
