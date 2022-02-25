import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { supabase } from '@/lib/supabase';

import { Spinner } from '@components/Spinner';
import * as Dialog from '@components/Dialog';

import * as S from './styles';

type FollowResponse = Array<{
  follow: {
    name: string;
    username: string;
    avatar_url: string;
  };
}>;

type FollowDialogProps = DialogPrimitive.DialogProps & {
  type: 'followers' | 'following';
};

const querys = {
  followers: 'follow:follower_username(name, username, avatar_url)',
  following: 'follow:followed_username(name, username, avatar_url)',
};

export const FollowDialog = ({ children, type, ...props }: FollowDialogProps) => {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);

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
    <Dialog.Root open={open} onOpenChange={setOpen} {...props}>
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
      <Dialog.Content>
        <Dialog.Title>{type === 'followers' ? 'Seguidores' : 'Seguindo'}</Dialog.Title>

        {followQuery.isLoading && (
          <S.SpinnerWrapper>
            <Spinner />
          </S.SpinnerWrapper>
        )}

        {followQuery.data?.length === 0 && (
          <S.NoFollow>
            {type === 'followers'
              ? 'Você não possui nenhum seguidor'
              : 'Você não está seguindo ninguém'}
          </S.NoFollow>
        )}

        {followQuery.data?.map(({ follow }) => (
          <S.FollowWrapper key={follow.username}>
            <Link href={`/${follow.username}`}>
              <a onClick={() => setOpen(false)}>
                <img src={follow.avatar_url} alt={`Foto de perfil de ${follow.username}`} />
              </a>
            </Link>
            <div>
              <Link href={`/${follow.username}`} passHref>
                <S.FollowUsername onClick={() => setOpen(false)}>
                  {follow.username}
                </S.FollowUsername>
              </Link>
              <S.FollowName>{follow.name}</S.FollowName>
            </div>
          </S.FollowWrapper>
        ))}
      </Dialog.Content>
    </Dialog.Root>
  );
};
