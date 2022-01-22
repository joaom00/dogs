import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr;
    overflow: hidden;
    max-height: 100vh;

    > div {
      display: none;
      user-select: none;
    }

    @media ${theme.media.greaterThan('medium')} {
      grid-template-columns: 1fr 1fr;

      > div {
        display: block;
      }
    }
  `}
`;

export const SignUpWrapper = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media ${theme.media.greaterThan('medium')} {
      padding: ${theme.space.xl} ${theme.space['4xl']};
    }
  `}
`;

export const BackToLogin = styled.a`
  ${({ theme }) => css`
    color: ${theme.colors.yellow8};
    text-decoration: underline;
  `}
`;

export const Title = styled.h1`
  ${({ theme }) => css`
    font-family: ${theme.font.heading};
    font-size: ${theme.font.sizes.xlarge};

    position: relative;
    margin-bottom: ${theme.space.xs};

    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 1.2rem;
      height: 1.2rem;
      background: ${theme.colors.yellow10};
      bottom: 0.6rem;
      left: -0.1rem;
      border-radius: 0.2rem;
      z-index: -1;
    }
  `}
`;

export const Description = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.sand11};
    margin-bottom: ${theme.space.xl};
  `}
`;
