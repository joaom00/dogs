import styled, { css } from 'styled-components';

import { AvatarImage } from '@radix-ui/react-avatar';

export const PostDesktop = styled.div`
  ${({ theme }) => css`
    max-width: 80vw;
    margin: 0 auto;
    margin-top: ${theme.space.md};
    height: 546px;
    border: 1px solid ${theme.colors.sand6};

    background-color: white;
    border-radius: 0 12px 12px 0;

    display: grid;
    grid-template-columns: 50vw 400px;
  `}
`;

export const PostContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PostImage = styled.div`
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  animation: placeholderShimmer 1s linear infinite forwards;

  @keyframes placeholderShimmer {
    0% {
      background-position: -40rem 0;
    }
    100% {
      background-position: 40rem 0;
    }
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const PostContentHeader = styled.header`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space.sm};

    padding: ${theme.space.sm};

    border-bottom: 1px solid ${theme.colors.sand6};

    p {
      flex-shrink: 0;
      font-weight: ${theme.font.bold};
    }
  `}
`;

export const PostContentHeaderImage = styled(AvatarImage)`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 9999px;
`;

export const PostContentHeaderImageFallback = styled.img`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 9999px;
`;

export const PostContentComments = styled.div`
  overflow: auto;
  flex: 1;
  max-height: 321px;

  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-scrollbar-track-color {
    display: none;
  }
`;

export const PostContentDescription = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space.sm};

    padding: ${theme.space.sm};

    img {
      width: 32px;
      height: 32px;
      object-fit: cover;
      border-radius: 9999px;
    }

    p {
      word-break: break-all;
      line-height: 2rem;
      font-size: ${theme.font.sizes.small};
      strong {
        font-weight: ${theme.font.bold};
      }
    }
  `}
`;

export const PostContentActions = styled.div`
  ${({ theme }) => css`
    border-top: 1px solid ${theme.colors.sand6};
    padding: ${theme.space.sm} ${theme.space.md};

    label {
      margin-left: ${theme.space.sm};
      cursor: pointer;
    }
  `}
`;

export const PostLikes = styled.p`
  ${({ theme }) => css`
    margin-top: ${theme.space.xs};
    margin-bottom: ${theme.space.xs};
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.bold};
  `}
`;

export const PostDate = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
    color: ${theme.colors.sand11};
  `}
`;

export const PostCommentForm = styled.form`
  ${({ theme }) => css`
    border-top: 1px solid ${theme.colors.sand6};
    position: relative;

    input {
      width: 100%;
      outline: none;
      border: none;
      padding: ${theme.space.sm};
    }

    button {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);

      font-size: ${theme.font.sizes.small};
      color: ${theme.colors.yellow7};
    }
  `}
`;

export const SubmitButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space.xs};
  `}
`;

export const SpinnerWrapper = styled.div`
  height: 100%;
  display: grid;
  place-items: center;
`;

export const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  margin-top: 10rem;

  a {
    text-decoration: underline;
  }
`;
