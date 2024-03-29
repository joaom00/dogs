import React from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { PostContentHeader } from '@components/PostDialog/styles';
import { AvatarBox } from '@templates/Profile/styles';
import { PostContent } from '@templates/Post/PostLayoutDesktop/styles';

type AvatarProps = {
  src?: string;
  alt?: string;
  fallbackSrc?: string;
  size: number;
};

export const Avatar = ({
  src,
  alt,
  fallbackSrc = 'https://schveufltdgsfxvyzrwb.supabase.in/storage/v1/object/public/avatars/user.jpg',
  size,
}: AvatarProps) => {
  return (
    <AvatarPrimitive.Root>
      <AvatarImage src={src} alt={alt} size={size} />
      <AvatarPrimitive.Fallback>
        <AvatarFallback src={fallbackSrc} size={size} />
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};

const AvatarImage = styled(AvatarPrimitive.Image)<{ size: number }>`
  ${({ theme, size }) => css`
    width: ${size}px;
    height: ${size}px;
    border-radius: 9999px;
    object-fit: cover;
    cursor: pointer;

    ${composeStyles(theme)}
  `}
`;

const AvatarFallback = styled.img<{ size: number }>`
  ${({ theme, size }) => css`
    width: ${size}px;
    height: ${size}px;
    border-radius: 9999px;
    object-fit: cover;
    cursor: pointer;

    ${composeStyles(theme)}
  `}
`;

const composeStyles = (theme: DefaultTheme) => css`
  ${AvatarBox} & {
    @media ${theme.media.greaterThan('small')} {
      width: 18.4rem;
      height: 18.4rem;
    }
  }

  ${PostContentHeader} &, ${PostContent} & {
    flex-shrink: 0;
  }
`;
