import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

import { supabase } from '@/lib/supabase';
import { useUser } from '@/context/AuthContext';

import { Button } from '@components/Button';
import { Spinner } from '@components/Spinner';

type FollowButtonProps = {
  username: string;
  onFollowChange: (followed: boolean) => void;
};

export const FollowButton = ({ username, onFollowChange }: FollowButtonProps) => {
  const { user } = useUser();

  const queryClient = useQueryClient();

  const followMutation = useMutation(followPost, {
    onSuccess: () => {
      queryClient.invalidateQueries([{ scope: 'followers', username }]);
      queryClient.invalidateQueries([{ scope: 'profile', type: 'detail', username }]);
      onFollowChange(true);
    },
  });

  async function followPost() {
    const { error } = await supabase.from('follows').insert([
      {
        follower_username: user?.user_metadata.username,
        followed_username: username,
      },
    ]);

    if (error) {
      toast.error('Algo deu errado, tente novamente mais tarde');
      return;
    }
  }

  function onSubmit() {
    followMutation.mutate();
  }

  return (
    <Button onClick={onSubmit} disabled={followMutation.isLoading}>
      {followMutation.isLoading && <Spinner />}
      Seguir
    </Button>
  );
};
