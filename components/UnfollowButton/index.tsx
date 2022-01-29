import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { supabase } from '@/lib/supabase';
import { useUser } from '@/context/AuthContext';

import type { ProfileResponse } from '@/templates/Profile/queries';

import { UserIcon } from '@/icons';
import { Button, Spinner } from '@/components';

import * as S from './styles';

type UnfollowButtonProps = {
  onFollowChange: (followed: boolean) => void;
};

export default function UnfollowButton({ onFollowChange }: UnfollowButtonProps) {
  const { user } = useUser();
  const router = useRouter();
  const username = router.query.username;

  const queryClient = useQueryClient();

  const userProfile = queryClient.getQueryData<ProfileResponse>([{ scope: 'profile', username }]);

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
      toast.error('Algo deu errado, tente novamente mais tarde');
      return;
    }
  }

  function onSubmit() {
    followMutation.mutate();
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button size="medium" variant="secondary" disabled={followMutation.isLoading}>
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
}
