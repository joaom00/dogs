import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { supabase } from '@/lib/supabase';

import { Dialog } from '@/components';

import * as S from './styles';

type FollowDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: 'Seguidores' | 'Seguindo';
  type: 'followers' | 'following';
};

type FollowResponse = Array<{
  follow: {
    name: string;
    username: string;
    avatar_url: string;
  };
}>;

const querys = {
  followers: 'follow:follower_username(name, username, avatar_url)',
  following: 'follow:followed_username(name, username, avatar_url)',
};

export default function FollowDialog({ title, type, open, onOpenChange }: FollowDialogProps) {
  const router = useRouter();

  async function getFollows(): Promise<FollowResponse | null> {
    const res = await supabase
      .from('follows')
      .select(querys[type])
      .eq(type === 'followers' ? 'followed_username' : 'follower_username', router.query.username);

    return res.data;
  }

  const followQuery = useQuery([{ scope: type, username: router.query.username }], getFollows, {
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Title>{title}</Dialog.Title>
        {!followQuery.data?.length && (
          <S.NoFollow>
            {type === 'followers'
              ? 'Você não possui nenhum seguidor'
              : 'Você não está seguindo ninguém'}
          </S.NoFollow>
        )}

        {followQuery.data?.map(({ follow }) => (
          <S.FollowWrapper key={follow.username}>
            <Link href={`/${follow.username}`}>
              <a onClick={() => onOpenChange(false)}>
                <img src={follow.avatar_url} alt={`Foto de perfil de ${follow.username}`} />
              </a>
            </Link>
            <div>
              <Link href={`/${follow.username}`} passHref>
                <S.FollowUsername onClick={() => onOpenChange(false)}>
                  {follow.username}
                </S.FollowUsername>
              </Link>
              <S.FollowName>{follow.name}</S.FollowName>
            </div>
            <S.FollowAction>Remover</S.FollowAction>
          </S.FollowWrapper>
        ))}
      </Dialog.Content>
    </Dialog>
  );
}
