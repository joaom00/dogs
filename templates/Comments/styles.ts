import styled, { css } from 'styled-components';
import { AvatarImage } from '@radix-ui/react-avatar';

export const CommentsHeaderWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: white;
`;

export const CommentsHeader = styled.header`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${theme.colors.sand6};
    padding: ${theme.space.sm};

    span {
      grid-column-start: 2;
    }

    button {
      justify-self: start;
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

export const FormWrapper = styled.form`
  ${({ theme }) => css`
    position: relative;
    padding: ${theme.space.sm};
    background-color: ${theme.colors.sand4};

    input {
      border: 1px solid ${theme.colors.sand6};
      padding: ${theme.space.sm};
      width: 100%;
      border-radius: 9999px;
    }
  `}
`;

export const PostContentDescription = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space.sm};
    margin-top: 8.1rem;

    padding: ${theme.space.sm};

    border: 1px solid ${theme.colors.sand6};

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

export const PostComment = styled.div`
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

export const SendButton = styled.button`
  ${({ theme }) => css`
    font-size: 1.4rem;
    position: absolute;
    right: 48px;
    top: 50%;
    transform: translateY(-50%);
    font-weight: ${theme.font.medium};
    color: ${theme.colors.yellow10};
  `}
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

export const SpinnerWrapper = styled.div`
  display: grid;
  place-items: center;
  margin-top: 19rem;
`;
