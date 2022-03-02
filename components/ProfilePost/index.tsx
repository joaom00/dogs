import NextLink from 'next/link';

import { HeartIcon, ChatIcon } from '@/icons';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import React from 'react';
import { PostDialog } from '../PostDialog';

type ProfileMobileProps = {
  username: string;
  post: {
    id: number;
    image_url: string;
    commentsCount: Array<{ count: number }>;
    likesCount: Array<{ count: number }>;
  };
};

export const ProfilePost = ({ post, username }: ProfileMobileProps) => {
  const isMobile = /iPhone|iPad|Android/i.test(globalThis?.navigator?.userAgent);

  const router = useRouter();
  const returnHref = React.useRef(router.asPath);

  if (isMobile) {
    return (
      <li>
        <NextLink key={post.id} href={`/p/${post.id}`}>
          <a>
            <Overlay>
              <span>
                <ChatIcon size={24} />
                {post.commentsCount[0].count}
              </span>
              <span>
                <HeartIcon size={24} />
                {post.likesCount[0].count}
              </span>
            </Overlay>
            <img src={post.image_url} alt={`Foto de ${username}`} />
          </a>
        </NextLink>
      </li>
    );
  }

  // TODO: arrumar overlay, colocar img e overlay no mesmo nivel e em baixo do
  // li
  return (
    <PostDialog postId={post.id} returnHref={returnHref.current}>
      <li>
        <NextLink
          key={post.id}
          href={`${router.pathname}?username=${username}`}
          as={`/p/${post.id}`}
          shallow
        >
          <Link>
            <Overlay>
              <span>
                <ChatIcon size={24} />
                {post.commentsCount[0].count}
              </span>
              <span>
                <HeartIcon size={24} />
                {post.likesCount[0].count}
              </span>
            </Overlay>
            <img src={post.image_url} alt={`Foto de ${username}`} />
          </Link>
        </NextLink>
      </li>
    </PostDialog>
  );
};

const Overlay = styled.div`
  ${({ theme }) => css`
    grid-area: 1/1;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2;

    display: none;
    justify-content: center;
    align-items: center;
    gap: ${theme.space.md};

    color: white;

    span {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
  `}
`;

const Link = styled.a`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr;

    img {
      grid-area: 1/1;
      width: 100%;
      max-width: 29.3rem;
      min-width: 12.3rem;
      height: 100%;
      max-height: 29.3rem;
      min-height: 12.3rem;
      object-fit: cover;
      display: block;

      @media ${theme.media.greaterThan('small')} {
        height: 29.3rem;
      }
    }
  `}
`;
