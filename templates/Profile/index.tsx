import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { useUser } from '@/context/AuthContext';

import { HeartIcon, ChatIcon } from '@/icons';
import { Button, FollowDialog } from '@/components';

import { getProfile } from './queries';

import * as S from './styles';

export default function ProfileTemplate() {
  const { user } = useUser();
  const router = useRouter();
  const username = router.query.username as string;

  const [openFollowers, setOpenFollowers] = React.useState(false);
  const [openFollowing, setOpenFollowing] = React.useState(false);

  const profileQuery = useQuery([{ scope: 'profile', username }], getProfile);

  if (!profileQuery.data) {
    return <div>pagina nao existe</div>;
  }

  return (
    <>
      <S.Wrapper>
        <S.ProfileImage
          src={profileQuery.data.avatar_url}
          alt={`Imagem de perfil de ${profileQuery.data.username}`}
        />
        <S.ProfileInfo>
          <S.ProfileUsername>{profileQuery.data.username}</S.ProfileUsername>
          {user?.user_metadata.username !== profileQuery.data.username && <Button>Seguir</Button>}
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
      </S.Wrapper>
      <S.Feed>
        {!profileQuery.data.posts.length && (
          // TODO: melhorar tela quando usuário não tiver publicações
          <S.NoPosts>Comece a capturar e a compartilhar seus momentos</S.NoPosts>
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
