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
    text-align: start;
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
    display: block;
    text-align: start;
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.sand11};
  `}
`;

export const NoFollow = styled.p`
  text-align: center;
  margin-top: 2.4rem;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3.2rem;
`;
