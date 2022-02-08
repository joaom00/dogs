import { Post, Spinner, Suggestions } from '@/components';

import { usePostsQuery } from './queries';

import * as S from './styles';

const Home = () => {
  const postsQuery = usePostsQuery();

  if (postsQuery.isLoading) {
    return (
      <S.SpinnerWrapper>
        <Spinner width={24} height={24} />
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
