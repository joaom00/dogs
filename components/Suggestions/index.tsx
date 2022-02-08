import React from 'react';
import Link from 'next/link';

import { FollowButton, UnfollowButton } from '@/components';

import { useUsersQuery } from './queries';

import * as S from './styles';
import Spinner from '../Spinner';

const Suggestions = () => {
  const usersQuery = useUsersQuery();

  return (
    <S.Wrapper>
      <h2>Algumas sugestões para você</h2>

      <S.UserList>
        {usersQuery.isLoading && (
          <S.SpinnerWrapper>
            <Spinner size={18} />
          </S.SpinnerWrapper>
        )}

        {usersQuery.data?.map((user) => (
          <S.User key={user.id}>
            <Link href={user.username}>
              <a>
                <img src={user.avatar_url} alt={`Foto de perfil de ${user.username}`} />
              </a>
            </Link>
            <Link href={user.username}>
              <a>{user.username}</a>
            </Link>
            <FollowUnfollowButton username={user.username} />
          </S.User>
        ))}
      </S.UserList>
    </S.Wrapper>
  );
};

type FollowUnfollowButtonProps = {
  username: string;
};

const FollowUnfollowButton = ({ username }: FollowUnfollowButtonProps) => {
  const [isFollowed, setIsFollowed] = React.useState(false);

  if (isFollowed) {
    return <UnfollowButton username={username} onFollowChange={setIsFollowed} />;
  }

  return <FollowButton username={username} onFollowChange={setIsFollowed} />;
};

export default Suggestions;
