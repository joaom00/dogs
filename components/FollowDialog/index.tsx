import React from 'react';
import Link from 'next/link';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { Spinner } from '@components/Spinner';
import * as Dialog from '@components/Dialog';

import * as S from './styles';

import { useFollows } from './queries';

type FollowDialogProps = DialogPrimitive.DialogProps & {
  scope: 'followers' | 'following';
};

export const FollowDialog = ({ children, scope, ...props }: FollowDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const follow = useFollows(scope, open);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} {...props}>
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
      <Dialog.Content>
        <Dialog.Title>{scope === 'followers' ? 'Seguidores' : 'Seguindo'}</Dialog.Title>

        {follow.isLoading && (
          <S.SpinnerWrapper>
            <Spinner />
          </S.SpinnerWrapper>
        )}

        {follow.isSuccess && !follow.data?.length && (
          <S.NoFollow>
            {scope === 'followers'
              ? 'Você não possui nenhum seguidor'
              : 'Você não está seguindo ninguém'}
          </S.NoFollow>
        )}

        {follow.data?.map(({ follow }) => (
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
