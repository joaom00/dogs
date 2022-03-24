import toast from 'react-hot-toast';

import { useUser } from '@/context/AuthContext';

import { Button } from '@components/Button';

import { useAddFollow } from './queries';

type FollowButtonProps = {
  username: string;
  onFollowChange: (followed: boolean) => void;
};

export const FollowButton = ({ username, onFollowChange }: FollowButtonProps) => {
  const { user } = useUser();
  const addFollow = useAddFollow();

  function onSubmit() {
    addFollow.mutate(
      {
        followedUsername: username,
        followerUsername: user?.user_metadata.username,
      },
      {
        onSuccess: () => {
          onFollowChange(true);
        },
        onError: (error) => {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        },
      }
    );
  }

  return (
    <Button onClick={onSubmit} disabled={addFollow.isLoading} loading={addFollow.isLoading}>
      Seguir
    </Button>
  );
};
