import Post from '@/components/Post';

import { usePostsQuery } from './queries';

import * as S from './styles';

const Home = () => {
  const postsQuery = usePostsQuery();

  if (!postsQuery.data) {
    return <p>Slide</p>;
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
