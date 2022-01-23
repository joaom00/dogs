import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

import { supabase } from '@/lib/supabase';
import { useUser } from '@/context/AuthContext';

import { Button, Spinner } from '@/components';

type FollowButtonProps = {
  onFollowChange: (followed: boolean) => void;
};

export default function FollowButton({ onFollowChange }: FollowButtonProps) {
  const { user } = useUser();
  const router = useRouter();
  const username = router.query.username;

  const queryClient = useQueryClient();

  const followMutation = useMutation(followPost, {
    onSuccess: () => {
      queryClient.invalidateQueries([{ scope: 'followers', username }]);
      queryClient.invalidateQueries([{ scope: 'profile', username }]);
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
}
