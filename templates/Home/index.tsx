import { HomePost } from '@components/HomePost';
import { Spinner } from '@components/Spinner';
import { Suggestions } from '@components/Suggestions';

import { usePosts } from './queries';

import * as S from './styles';

const Home = () => {
  const postsQuery = usePosts();

  if (postsQuery.isLoading) {
    return (
      <S.SpinnerWrapper>
        <Spinner size={24} />
      </S.SpinnerWrapper>
    );
  }

  if (!postsQuery.data?.length) {
    return <Suggestions />;
  }

  return (
    <S.Wrapper>
      {postsQuery.data.map((post) => (
        <HomePost key={post.id} post={post} />
      ))}
    </S.Wrapper>
  );
};

export default Home;
