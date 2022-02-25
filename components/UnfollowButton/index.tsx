import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { supabase } from '@/lib/supabase';
import { useUser } from '@/context/AuthContext';

import type { ProfileResponse } from '@/templates/Profile/queries';

import { UserIcon } from '@/icons';
import { Button } from '@components/Button';
import { Spinner } from '@components/Spinner';

import * as S from './styles';

type UnfollowButtonProps = {
  username: string;
  onFollowChange: (followed: boolean) => void;
};

export const UnfollowButton = ({ username, onFollowChange }: UnfollowButtonProps) => {
  const { user } = useUser();

  const queryClient = useQueryClient();

  const userProfile = queryClient.getQueryData<ProfileResponse>([
    { scope: 'profile', type: 'detail', username },
  ]);

  const followMutation = useMutation(followDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries([{ scope: 'followers', username }]);
      queryClient.invalidateQueries([{ scope: 'profile', type: 'detail', username }]);
      onFollowChange(false);
    },
  });

  async function followDelete() {
    const { error } = await supabase.from('follows').delete().match({
      follower_username: user?.user_metadata.username,
      followed_username: username,
    });

    if (error) {
      return toast.error('Algo deu errado, tente novamente mais tarde');
    }
  }

  function onSubmit() {
    followMutation.mutate();
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button
          aria-label={`deixar de seguir ${username}`}
          size="medium"
          variant="secondary"
          disabled={followMutation.isLoading}
        >
          {followMutation.isLoading && <Spinner />}
          <UserIcon size={16} />
        </Button>
      </AlertDialog.Trigger>

      <S.AlertDialogOverlay />
      <S.AlertDialogContent>
        <S.ProfileImage>
          <img src={userProfile?.avatar_url} alt={`Foto de perfil de ${userProfile?.username}`} />
        </S.ProfileImage>
        <S.AlertDialogTitle>Deixar de seguir @{userProfile?.username}?</S.AlertDialogTitle>

        <S.ActionsWrapper>
          <S.AlertDialogAction onClick={onSubmit}>Deixar de seguir</S.AlertDialogAction>
          <S.AlertDialogCancel>Cancelar</S.AlertDialogCancel>
        </S.ActionsWrapper>
      </S.AlertDialogContent>
    </AlertDialog.Root>
  );
};
