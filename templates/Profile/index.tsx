import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { useUser } from '@/context/AuthContext';
import { useUploadAvatar } from '@/lib/useUploadAvatar';

import { CameraIcon } from '@/icons';
import { FollowDialog } from '@components/FollowDialog';
import { FollowButton } from '@components/FollowButton';
import { UnfollowButton } from '@components/UnfollowButton';
import { Logo } from '@components/Logo';
import { PostDialog } from '@components/PostDialog';
import { Avatar } from '@components/Avatar';
import { ProfilePost } from '@/components/ProfilePost';

import { useProfile, useProfilePosts } from './queries';

import * as S from './styles';

const ProfileTemplate = () => {
  const { user } = useUser();
  const router = useRouter();
  const username = router.query.username as string;
  const returnHref = React.useRef(router.asPath);

  const profile = useProfile();
  const profilePosts = useProfilePosts();
  const uploadAvatar = useUploadAvatar();

  const [hasFollowed, setHasFollowed] = React.useState(profile.data?.hasFollowed);
  const [open, setOpen] = React.useState(false);
  const [postId, setPostId] = React.useState(0);

  const onDialogOpen = (postId: number) => {
    setPostId(postId);
    setOpen(true);
  };

  React.useEffect(() => {
    setHasFollowed(profile.data?.hasFollowed);
  }, [profile.data?.hasFollowed]);

  const isUserLoggedProfile = user?.user_metadata.username === profile.data?.username;

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];

    uploadAvatar.mutate(
      { file, username: user?.user_metadata.username },
      {
        onSuccess: () => {
          toast.success('Foto de perfil atualizada');
        },
      }
    );
  };

  if (!profile.data) {
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
        <S.ProfileAvatarWrapper>
          <Avatar
            src={profile.data.avatar_url}
            alt={`Foto de perfil de ${profile.data.username}`}
            size={84}
          />
          <input
            type="file"
            accept="image/jpg, image/png, image/jpeg"
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
        </S.ProfileAvatarWrapper>
        <S.ProfileInfo>
          <S.ProfileUsername>{profile.data.username}</S.ProfileUsername>
          {!!user &&
            (!isUserLoggedProfile ? (
              hasFollowed ? (
                <UnfollowButton username={username} onFollowChange={setHasFollowed} />
              ) : (
                <FollowButton username={username} onFollowChange={setHasFollowed} />
              )
            ) : null)}
        </S.ProfileInfo>
        <S.ProfileStats>
          <p>
            <strong>{profile.data.postsCount[0].count}</strong> publicações
          </p>

          <FollowDialog scope="followers">
            <p>
              <strong>{profile.data.followersCount[0].count}</strong> seguidores
            </p>
          </FollowDialog>

          <FollowDialog scope="following">
            <p>
              <strong>{profile.data.followingCount[0].count}</strong> seguindo
            </p>
          </FollowDialog>
        </S.ProfileStats>
        <S.ProfileBio>
          <p>{profile.data.name}</p>
          <p>{profile.data.bio}</p>
        </S.ProfileBio>
      </S.ProfileWrapper>

      <S.Feed>
        {!profilePosts.data?.length && (
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

        {profilePosts.data?.map((post) => (
          <ProfilePost
            key={post.id}
            post={post}
            username={profile.data.username}
            onDialogOpen={onDialogOpen}
          />
        ))}
      </S.Feed>

      <PostDialog
        postId={postId}
        returnHref={returnHref.current}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};

export default ProfileTemplate;
