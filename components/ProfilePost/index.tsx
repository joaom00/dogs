import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { HeartIcon, ChatIcon } from '@/icons';

import * as S from './styles';

type ProfileMobileProps = {
  onDialogOpen: (postId: number) => void;
  username: string;
  post: {
    id: number;
    image_url: string;
    commentsCount: Array<{ count: number }>;
    likesCount: Array<{ count: number }>;
  };
};

export const ProfilePost = ({ post, username, onDialogOpen }: ProfileMobileProps) => {
  const isMobile = /iPhone|iPad|Android/i.test(globalThis?.navigator?.userAgent);

  const router = useRouter();

  if (isMobile) {
    return (
      <S.Box>
        <Link href={`/p/${post.id}`} passHref>
          <S.Link>
            <S.Overlay>
              <span>
                <ChatIcon size={24} />
                {post.commentsCount[0].count}
              </span>
              <span>
                <HeartIcon size={24} />
                {post.likesCount[0].count}
              </span>
            </S.Overlay>
            <img src={post.image_url} alt={`Foto de ${username}`} />
          </S.Link>
        </Link>
      </S.Box>
    );
  }

  return (
    <S.Box onClick={() => onDialogOpen(post.id)}>
      <Link href={`${router.pathname}?username=${username}`} as={`/p/${post.id}`} shallow passHref>
        <S.Link>
          <S.Overlay>
            <span>
              <ChatIcon size={24} />
              {post.commentsCount[0].count}
            </span>
            <span>
              <HeartIcon size={24} />
              {post.likesCount[0].count}
            </span>
          </S.Overlay>
          <img src={post.image_url} alt={`Foto de ${username}`} />
        </S.Link>
      </Link>
    </S.Box>
  );
};
