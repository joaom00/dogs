import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactTimeAgo from 'react-time-ago';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { useUser } from '@/context/AuthContext';

import { ChatIcon, CloseIcon, HeartIcon } from '@/icons';
import { Spinner } from '@/components';
import { Avatar, AvatarFallback } from '@/components/Avatar';

import {
  useCommentMutation,
  usePostCommentsQuery,
  usePostDetailQuery,
  useLikeMutation,
  useUnlikeMutation,
} from './queries';

import * as S from './styles';

type PostDialogProps = {
  postId: number;
  returnHref?: string;
} & DialogPrimitive.DialogProps;

const PostDialog: React.FC<PostDialogProps> = ({ children, postId, returnHref, ...props }) => {
  const { user } = useUser();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState('');

  const postQuery = usePostDetailQuery(postId, props.open ?? open);
  const commentsQuery = usePostCommentsQuery(postId, props.open ?? open);
  const commentMutation = useCommentMutation();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!content.trim()) return;

    commentMutation.mutate(
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
              {postQuery.data?.image_url && (
                <img
                  src={postQuery.data.image_url}
                  alt={`Publicação de ${postQuery.data?.user?.username}`}
                />
              )}
            </S.PostImage>

            <S.PostContent>
              {postQuery.isLoading || commentsQuery.isLoading ? (
                <S.SpinnerWrapper>
                  <Spinner />
                </S.SpinnerWrapper>
              ) : (
                <>
                  <S.PostContentHeader>
                    <Link href={`/${postQuery.data?.user?.username}`}>
                      <a>
                        <Avatar>
                          <S.PostContentHeaderImage
                            src={postQuery.data?.user?.avatar_url}
                            alt={`Foto de perfil de ${postQuery.data?.user?.username}`}
                          />
                          <AvatarFallback>
                            <S.PostContentHeaderImageFallback />
                          </AvatarFallback>
                        </Avatar>
                      </a>
                    </Link>

                    <Link href={`/${postQuery.data?.user?.username}`}>
                      <a>
                        <p>{postQuery.data?.user?.username}</p>
                      </a>
                    </Link>
                  </S.PostContentHeader>

                  <S.PostContentComments>
                    <S.PostContentDescription>
                      <Link href={`/${postQuery.data?.user?.username}`}>
                        <a>
                          <Avatar>
                            <S.PostContentHeaderImage
                              src={postQuery.data?.user?.avatar_url}
                              alt={`Foto de perfil de ${postQuery.data?.user?.username}`}
                            />
                            <AvatarFallback>
                              <S.PostContentHeaderImageFallback />
                            </AvatarFallback>
                          </Avatar>
                        </a>
                      </Link>

                      <p>
                        <Link href={`/${postQuery.data?.user?.username}`}>
                          <a>
                            <strong>{postQuery.data?.user?.username}</strong>
                          </a>
                        </Link>{' '}
                        {postQuery.data?.description}
                      </p>
                    </S.PostContentDescription>

                    {commentsQuery.data?.map((comment) => (
                      <S.PostContentDescription key={comment.id}>
                        <Link href={`/${comment.user.username}`}>
                          <a>
                            <Avatar>
                              <S.PostContentHeaderImage
                                src={postQuery.data?.user?.avatar_url}
                                alt={`Foto de perfil de ${postQuery.data?.user?.username}`}
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
                    {postQuery.data?.hasLiked ? (
                      <UnlikeButton postId={postId} />
                    ) : (
                      <LikeButton postId={postId} />
                    )}

                    <label htmlFor="comment">
                      <ChatIcon size={24} />
                    </label>

                    <S.PostLikes>{postQuery.data?.likesCount?.[0].count} curtidas</S.PostLikes>

                    <S.PostDate>
                      <ReactTimeAgo date={new Date(postQuery.data?.created_at as string)} />
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
                    <S.SubmitButton disabled={commentMutation.isLoading}>
                      {commentMutation.isLoading && <Spinner />}
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
  const likeMutation = useLikeMutation();

  const handleClick = () => {
    likeMutation.mutate({ postId, userId: user?.id as string });
  };

  return (
    <button onClick={handleClick}>
      <HeartIcon size={24} />
    </button>
  );
};

const UnlikeButton = ({ postId }: { postId: number }) => {
  const { user } = useUser();
  const likeMutation = useUnlikeMutation();

  const handleClick = () => {
    likeMutation.mutate({ postId, userId: user?.id as string });
  };

  return (
    <button onClick={handleClick}>
      <HeartIcon fill="red" stroke="red" size={24} />
    </button>
  );
};

export default PostDialog;
