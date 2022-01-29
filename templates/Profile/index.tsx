import React from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { useUser } from '@/context/AuthContext';

import { HeartIcon, ChatIcon, CameraIcon } from '@/icons';
import { FollowDialog, FollowButton, UnfollowButton, Logo, PostDialog } from '@/components';

import { useProfileQuery, useUploadFileMutation, useUserPosts } from './queries';

import * as S from './styles';

const ProfileTemplate = (props: { isFollowed: boolean }) => {
  const { user } = useUser();

  const profileQuery = useProfileQuery();
  const postsQuery = useUserPosts();
  const uploadFileMutation = useUploadFileMutation();

  const [isFollowed, setIsFollowed] = React.useState(props.isFollowed);

  const isUserLoggedProfile = user?.user_metadata.username === profileQuery.data?.username;

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];

    uploadFileMutation.mutate(
      { file, username: user?.user_metadata.username },
      {
        onSuccess: () => {
          toast.success('Foto de perfil atualizada');
        },
      }
    );
  };

  if (!profileQuery.data) {
    return (
      <S.UserNotFound>
        <h2>Esta página não está disponível.</h2>
        <p>
          O link que você acessou pode estar quebrado ou a página pode ter sido removida.{' '}
          <Link href="/">
            <a>Voltar para o início.</a>
          </Link>
        </p>
      </S.UserNotFound>
    );
  }

  return (
    <>
      <S.ProfileWrapper>
        <S.ProfileImageWrapper>
          <S.ProfileImage
            src={profileQuery.data.avatar_url}
            alt={`Imagem de perfil de ${profileQuery.data.username}`}
          />
          <input
            type="file"
            accept="image/jpg, image/png, image/jpeg"
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
        </S.ProfileImageWrapper>
        <S.ProfileInfo>
          <S.ProfileUsername>{profileQuery.data.username}</S.ProfileUsername>
          {!!user &&
            (!isUserLoggedProfile ? (
              isFollowed ? (
                <UnfollowButton onFollowChange={setIsFollowed} />
              ) : (
                <FollowButton onFollowChange={setIsFollowed} />
              )
            ) : null)}
        </S.ProfileInfo>
        <S.ProfileStats>
          <p>
            <strong>{profileQuery.data.postsCount[0].count}</strong> publicações
          </p>

          <FollowDialog type="followers">
            <p>
              <strong>{profileQuery.data.followersCount[0].count}</strong> seguidores
            </p>
          </FollowDialog>

          <FollowDialog type="following">
            <p>
              <strong>{profileQuery.data.followingCount[0].count}</strong> seguindo
            </p>
          </FollowDialog>
        </S.ProfileStats>
        <S.ProfileBio>
          <p>{profileQuery.data.name}</p>
          <p>{profileQuery.data.bio}</p>
        </S.ProfileBio>
      </S.ProfileWrapper>

      <S.Feed>
        {!postsQuery.data?.length && (
          <S.NoPosts>
            {isUserLoggedProfile ? (
              <>
                <Logo size="large" />
                <p>Comece a capturar e a compartilhar seus momentos</p>
              </>
            ) : (
              <>
                <CameraIcon size={28} />
                <p>Ainda não há nenhuma publicação</p>
              </>
            )}
          </S.NoPosts>
        )}

        {postsQuery.data?.map((post) => (
          <PostDialog key={post.id} postId={post.id}>
            <li>
              <S.Overlay>
                <span>
                  <ChatIcon size={24} />
                  {post.commentsCount[0].count}
                </span>
                <span>
                  <HeartIcon size={24} />
                  {post.likesCount[0].count}
                </span>
              </S.Overlay>
              <img src={post.image_url} alt={`Foto de ${profileQuery.data.username}`} />
            </li>
          </PostDialog>
        ))}
      </S.Feed>
    </>
  );
};

export default ProfileTemplate;
