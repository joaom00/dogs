import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { supabase } from '@/lib/supabase';

import { Dialog } from '@/components';

import * as S from './styles';

type FollowResponse = Array<{
  follow: {
    name: string;
    username: string;
    avatar_url: string;
  };
}>;

type FollowDialogContentProps = DialogPrimitive.DialogContentProps & {
  type: 'followers' | 'following';
};

type FollowDialogContextData = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const querys = {
  followers: 'follow:follower_username(name, username, avatar_url)',
  following: 'follow:followed_username(name, username, avatar_url)',
};

const FollowDialogContext = React.createContext<FollowDialogContextData | undefined>(undefined);

const useFollowDialogContext = () => {
  const context = React.useContext(FollowDialogContext);

  if (context === undefined) {
    throw new Error('useFollowDialogContext must be used within FollowDialog');
  }

  return context;
};

const FollowDialog = (props: DialogPrimitive.DialogProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <FollowDialogContext.Provider
      value={React.useMemo(() => ({ open, onOpenChange: setOpen }), [open])}
    >
      <Dialog open={open} onOpenChange={setOpen} {...props} />
    </FollowDialogContext.Provider>
  );
};

const FollowDialogTrigger = (props: DialogPrimitive.DialogTriggerProps) => {
  return <DialogPrimitive.Trigger {...props} />;
};

const FollowDialogContent = ({ type, ...props }: FollowDialogContentProps) => {
  const router = useRouter();
  const context = useFollowDialogContext();

  async function getFollows(): Promise<FollowResponse | null> {
    const res = await supabase
      .from('follows')
      .select(querys[type])
      .eq(type === 'followers' ? 'followed_username' : 'follower_username', router.query.username);

    return res.data;
  }

  const followQuery = useQuery([{ scope: type, username: router.query.username }], getFollows, {
    enabled: context.open,
  });

  return (
    <Dialog.Content {...props}>
      <Dialog.Title>{type === 'followers' ? 'Seguidores' : 'Seguindo'}</Dialog.Title>

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
            <a onClick={() => context.onOpenChange(false)}>
              <img src={follow.avatar_url} alt={`Foto de perfil de ${follow.username}`} />
            </a>
          </Link>
          <div>
            <Link href={`/${follow.username}`} passHref>
              <S.FollowUsername onClick={() => context.onOpenChange(false)}>
                {follow.username}
              </S.FollowUsername>
            </Link>
            <S.FollowName>{follow.name}</S.FollowName>
          </div>
          <S.FollowAction>Remover</S.FollowAction>
        </S.FollowWrapper>
      ))}
    </Dialog.Content>
  );
};

const Root = FollowDialog;
const Trigger = FollowDialogTrigger;
const Content = FollowDialogContent;

export { Root, Trigger, Content };
