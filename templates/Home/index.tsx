import { Post, Spinner, Suggestions } from '@/components';

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
        <Post key={post.id} post={post} />
      ))}
    </S.Wrapper>
  );
};

export default Home;
