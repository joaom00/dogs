import styled, { css } from 'styled-components';

import { Overlay, Content, Close } from '@radix-ui/react-dialog';

export const DialogOverlay = styled(Overlay)`
  background-color: rgba(0, 0, 0, 0.85);
  position: fixed;
  inset: 0;

  @media (prefers-reduced-motion: no-preference) {
    animation: overlayShow 250ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes overlayShow {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 100;
    }
  }
`;

export const DialogContent = styled(Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 646px;

  background-color: white;
  border-radius: 0 12px 12px 0;
  overflow: hidden;

  display: grid;
  grid-template-columns: 50vw 400px;

  @media (prefers-reduced-motion: no-preference) {
    animation: contentShow 250ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes contentShow {
    0% {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }

    100% {
      opacity: 100;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

export const DialogClose = styled(Close)`
  ${({ theme }) => css`
    padding: ${theme.space.xs};
    display: grid;
    place-items: center;
    color: ${theme.colors.yellow1};

    position: absolute;
    right: 8px;
    top: 8px;
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

    img {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      object-fit: cover;
      border-radius: 9999px;
    }

    p {
      flex-shrink: 0;
      font-weight: ${theme.font.bold};
    }
  `}
`;

export const PostContentComments = styled.div`
  overflow: auto;
  flex: 1;
  max-height: 425px;

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
