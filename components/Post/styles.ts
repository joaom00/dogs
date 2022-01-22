import styled, { css } from 'styled-components';

export const Wrapper = styled.li`
  ${({ theme }) => css`
    max-width: 61.4rem;
    margin: 0 auto;
    padding-bottom: ${theme.space.sm};

    border: 1px solid ${theme.colors.sand6};
  `}
`;

export const PostHeader = styled.header`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space.xs};
    padding: ${theme.space.xs};

    img {
      width: 3.2rem;
      height: 3.2rem;
      object-fit: cover;
      border-radius: 50%;
    }

    p {
      font-weight: ${theme.font.medium};
      color: ${theme.colors.sand12};
    }
  `}
`;

export const PostImage = styled.img`
  width: 100%;
`;

export const PostActions = styled.div`
  ${({ theme }) => css`
    padding: ${theme.space.sm};
    color: ${theme.colors.sand12};

    display: flex;
    align-items: center;
    gap: ${theme.space.sm};
  `}
`;

export const PostLikes = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.sand12};
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.bold};
    padding-left: ${theme.space.sm};
  `}
`;

export const PostDescription = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.sand12};
    padding-left: ${theme.space.sm};
    margin-top: ${theme.space.sm};
    font-size: ${theme.font.sizes.small};
    line-height: 2rem;

    strong {
      font-weight: ${theme.font.bold};
    }
  `}
`;

export const PostShowAllComments = styled.button`
  ${({ theme }) => css`
    color: ${theme.colors.sand11};
    font-size: ${theme.font.sizes.small};
    padding-left: ${theme.space.sm};
    margin-top: ${theme.space.xs};
    margin-bottom: ${theme.space.xs};
  `}
`;

export const PostCreatedInfo = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.sand11};
    font-size: ${theme.font.sizes.xsmall};
    padding-left: ${theme.space.sm};
  `}
`;
