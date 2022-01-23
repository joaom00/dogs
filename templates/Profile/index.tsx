import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { supabase } from '@/lib/supabase';
import { useUser } from '@/context/AuthContext';

import { HeartIcon, ChatIcon, CameraIcon } from '@/icons';
import { FollowButton, UnfollowButton, FollowDialog, Logo } from '@/components';

import { getProfile, ProfileResponse } from './queries';

import * as S from './styles';

export default function ProfileTemplate({ isFollowed: _isFollowed }: { isFollowed: boolean }) {
  const { user } = useUser();
  const router = useRouter();
  const username = router.query.username as string;

  const queryClient = useQueryClient();

  const [isFollowed, setIsFollowed] = React.useState(_isFollowed);
  const [openFollowers, setOpenFollowers] = React.useState(false);
  const [openFollowing, setOpenFollowing] = React.useState(false);

  const profileQuery = useQuery([{ scope: 'profile', username }], getProfile);

  const isUserLoggedProfile = user?.user_metadata.username === profileQuery.data?.username;

  const uploadFileMutation = useMutation(uploadFile, {
    onSuccess: (_data, file) => {
      const key = [{ scope: 'profile', username: user?.user_metadata.username }];

      const userLoggedData = queryClient.getQueryData<ProfileResponse>(key);

      queryClient.setQueryData(key, () => ({
        ...userLoggedData,
        avatar_url: URL.createObjectURL(file),
      }));

      queryClient.setQueryData(['header_image'], () => ({
        avatar_url: URL.createObjectURL(file),
      }));
    },
  });

  async function uploadFile(file: File) {
    await supabase.storage.from('photos/avatars').upload(file.name, file);
    const { publicURL } = supabase.storage.from('photos/avatars').getPublicUrl(file.name);
    await supabase
      .from('profiles')
      .update({ avatar_url: publicURL })
      .match({ username: user?.user_metadata.username });
  }

  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    uploadFileMutation.mutate(file);
  }

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
          <p onClick={() => setOpenFollowers(true)}>
            <strong>{profileQuery.data.followersCount[0].count}</strong> seguidores
          </p>
          <p onClick={() => setOpenFollowing(true)}>
            <strong>{profileQuery.data.followingCount[0].count}</strong> seguindo
          </p>
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

      <FollowDialog
        title="Seguidores"
        type="followers"
        open={openFollowers}
        onOpenChange={setOpenFollowers}
      />

      <FollowDialog
        title="Seguindo"
        type="following"
        open={openFollowing}
        onOpenChange={setOpenFollowing}
      />
    </>
  );
}
