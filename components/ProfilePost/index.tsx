import React from 'react';
import Link from 'next/link';

import { HeartIcon, ChatIcon } from '@/icons';

import * as S from './styles';

type ProfilePostProps = {
  username: string;
  href: string;
  onOpenChange: (open: boolean) => void;
  post: {
    id: number;
    image_url: string;
    commentsCount: Array<{ count: number }>;
    likesCount: Array<{ count: number }>;
  };
};

export const ProfilePost = ({ post, username, href, onOpenChange }: ProfilePostProps) => {
  const isMobile = /iPhone|iPad|Android/i.test(globalThis?.navigator?.userAgent);

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
    <S.Box onClick={() => onOpenChange(true)}>
      <Link href={href} as={`/p/${post.id}`} shallow passHref>
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
