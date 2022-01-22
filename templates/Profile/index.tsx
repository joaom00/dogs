import React from 'react';

import { HeartIcon, ChatIcon } from '@/icons';
import Button from '@/components/Button';
import { Dialog, DialogTitle, DialogContent } from '@/components/Dialog';

import * as S from './styles';

type User = {
  name: string;
  username: string;
  avatar_url: string;
  bio: string;
  posts: Array<{
    id: string;
    image_url: string;
  }>;
};

type ProfileTemplateProps = {
  user: User | null;
};

export default function ProfileTemplate({ user }: ProfileTemplateProps) {
  const [openFollowers, setOpenFollowers] = React.useState(false);
  const [openFollowing, setOpenFollowing] = React.useState(false);

  if (!user) {
    return <div>pagina nao existe</div>;
  }

  return (
    <>
      <S.Wrapper>
        <S.ProfileImage src={user.avatar_url} alt={`Imagem de perfil de ${user.username}`} />
        <S.ProfileInfo>
          <S.ProfileUsername>{user.username}</S.ProfileUsername>
          <Button>Seguir</Button>
        </S.ProfileInfo>
        <S.ProfileStats>
          <p>
            <strong>0</strong> publicações
          </p>
          <p onClick={() => setOpenFollowers(true)}>
            <strong>0</strong> seguidores
          </p>
          <p onClick={() => setOpenFollowing(true)}>
            <strong>0</strong> seguindo
          </p>
        </S.ProfileStats>
        <S.ProfileBio>
          <p>{user.name}</p>
          <p>{user.bio}</p>
        </S.ProfileBio>
      </S.Wrapper>
      <S.Feed>
        {user.posts.map((post) => (
          <li key={post.id}>
            <S.Overlay>
              <ChatIcon size={24} />
              <HeartIcon size={24} />
            </S.Overlay>
            <img src={post.image_url} alt={`Foto de ${user.username}`} />
          </li>
        ))}
      </S.Feed>

      <Dialog open={openFollowers} onOpenChange={setOpenFollowers}>
        <DialogContent>
          <DialogTitle>Seguidores</DialogTitle>
          <S.FollowWrapper>
            <img
              src="https://images.unsplash.com/photo-1638913662529-1d2f1eb5b526?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="foto"
            />
            <div>
              <S.FollowUsername>rafaelbandeira20</S.FollowUsername>
              <S.FollowName>Rafael Bandeira</S.FollowName>
            </div>
            <S.FollowAction>Remover</S.FollowAction>
          </S.FollowWrapper>
          <S.FollowWrapper>
            <img
              src="https://images.unsplash.com/photo-1638913662529-1d2f1eb5b526?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="foto"
            />
            <div>
              <S.FollowUsername>rafaelbandeira20</S.FollowUsername>
            </div>
            <S.FollowAction>Remover</S.FollowAction>
          </S.FollowWrapper>
        </DialogContent>
      </Dialog>

      <Dialog open={openFollowing} onOpenChange={setOpenFollowing}>
        <DialogContent>
          <DialogTitle>Seguindo</DialogTitle>
          <p>following</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
