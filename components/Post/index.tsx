import Link from 'next/link';

import { HeartIcon, ChatIcon } from '@/icons';

import type { PostResponse } from '@/templates/Home/queries';

import * as S from './styles';

export default function Post({ post }: { post: PostResponse }) {
  return (
    <S.Wrapper>
      <S.PostHeader>
        <Link href={post.owner.username}>
          <a>
            <img src={post.owner.avatar_url} alt={`Foto de perfil de ${post.owner.username}`} />
          </a>
        </Link>
        <Link href={post.owner.username}>
          <a>{post.owner.username}</a>
        </Link>
      </S.PostHeader>
      <S.PostImage src={post.image_url} />
      <S.PostActions>
        <HeartIcon size={24} />
        <ChatIcon size={24} />
      </S.PostActions>
      <S.PostLikes>{post.likesCount[0].count} curtidas</S.PostLikes>
      <S.PostDescription>
        <strong>{post.owner.username}</strong> {post.description}
      </S.PostDescription>
      <S.PostShowAllComments>
        Ver todos os {post.commentsCount[0].count} comentários
      </S.PostShowAllComments>
      <div>
        <p></p>
        <p></p>
      </div>
      <S.PostCreatedInfo>há 1 dia</S.PostCreatedInfo>
    </S.Wrapper>
  );
}
