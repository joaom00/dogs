import { HomePost } from '@components/HomePost';
import { Spinner } from '@components/Spinner';
import { Suggestions } from '@components/Suggestions';

import { usePosts } from './queries';

import * as S from './styles';

export const Home = () => {
  const postsQuery = usePosts();

  if (postsQuery.isLoading) {
    return (
      <S.SpinnerBox>
        <Spinner size={24} />
      </S.SpinnerBox>
    );
  }

  if (!postsQuery.data?.length) {
    return <Suggestions />;
  }

  return (
    <S.Box>
      {postsQuery.data.map((post) => (
        <HomePost key={post.id} post={post} />
      ))}
    </S.Box>
  );
};
