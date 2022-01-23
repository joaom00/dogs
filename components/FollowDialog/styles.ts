import styled, { css } from 'styled-components';

export const FollowWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 40px 1fr 76px;
    align-items: center;
    padding: ${theme.space.sm} ${theme.space.md};

    img {
      width: 3rem;
      height: 3rem;
      object-fit: cover;
      border-radius: 9999px;
    }
  `}
`;

export const FollowUsername = styled.a`
  ${({ theme }) => css`
    display: block;
    font-weight: ${theme.font.medium};
    font-size: ${theme.font.sizes.small};
    margin-bottom: 4px;

    &:hover {
      text-decoration: underline;
    }
  `}
`;

export const FollowName = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.sand11};
  `}
`;

export const FollowAction = styled.button`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    border: 1px solid ${theme.colors.sand6};
    color: ${theme.colors.sand12};
    border-radius: ${theme.radii.base};
    height: 100%;
  `}
`;

export const NoFollow = styled.p`
  text-align: center;
  margin-top: 2.4rem;
`;
