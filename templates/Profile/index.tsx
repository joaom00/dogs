import React from 'react';
import Link from 'next/link';

import { useUser } from '@/context/AuthContext';

import { HeartIcon, ChatIcon, CameraIcon } from '@/icons';
import { FollowDialog, FollowButton, UnfollowButton, Logo } from '@/components';

import { useProfileQuery, useUploadFileMutation } from './queries';

import * as S from './styles';

export default function ProfileTemplate({ isFollowed: _isFollowed }: { isFollowed: boolean }) {
  const { user } = useUser();

  const profileQuery = useProfileQuery();
  const uploadFileMutation = useUploadFileMutation();

  const [isFollowed, setIsFollowed] = React.useState(_isFollowed);

  const isUserLoggedProfile = user?.user_metadata.username === profileQuery.data?.username;

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    uploadFileMutation.mutate({ file, username: user?.user_metadata.username });
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

          <FollowDialog.Root>
            <FollowDialog.Trigger asChild>
              <p>
                <strong>{profileQuery.data.followersCount[0].count}</strong> seguidores
              </p>
            </FollowDialog.Trigger>
            <FollowDialog.Content type="followers" />
          </FollowDialog.Root>

          <FollowDialog.Root>
            <FollowDialog.Trigger asChild>
              <p>
                <strong>{profileQuery.data.followingCount[0].count}</strong> seguindo
              </p>
            </FollowDialog.Trigger>
            <FollowDialog.Content type="following" />
          </FollowDialog.Root>
        </S.ProfileStats>
        <S.ProfileBio>
          <p>{profileQuery.data.name}</p>
          <p>{profileQuery.data.bio}</p>
        </S.ProfileBio>
      </S.ProfileWrapper>

      <S.Feed>
        {!profileQuery.data.posts.length && (
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

        {profileQuery.data.posts.map((post) => (
          <li key={post.id}>
            <S.Overlay>
              <span>
                <ChatIcon size={24} />
                {post.comments[0].count}
              </span>
              <span>
                <HeartIcon size={24} />
                {post.likes[0].count}
              </span>
            </S.Overlay>
            <img src={post.image_url} alt={`Foto de ${profileQuery.data.username}`} />
          </li>
        ))}
      </S.Feed>
    </>
  );
}
