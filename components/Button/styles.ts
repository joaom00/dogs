import styled, { css, DefaultTheme } from 'styled-components';

import { ProfileInfo } from '@/templates/Profile/styles';
import { SignUpWrapper } from '@/templates/SignUp/styles';
import { SignInWrapper } from '@/templates/SignIn/styles';

type WrapperProps = {
  size: 'small' | 'medium';
};

const modifiers = {
  small: (theme: DefaultTheme) => css`
    padding: 0.8rem 1.6rem;
    font-size: ${theme.font.sizes.small};
  `,

  medium: (theme: DefaultTheme) => css`
    padding: ${theme.space.sm};
  `,
};

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, size }) => css`
    color: ${theme.colors.yellow12};
    background-color: ${theme.colors.yellow9};
    font-weight: ${theme.font.bold};
    transition: all 0.1s;
    letter-spacing: 0.08em;
    border-radius: ${theme.radii.base};

    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${theme.space.xs};

    ${modifiers[size](theme)};

    &:hover {
      background-color: ${theme.colors.yellow10};
    }

    &:focus {
      box-shadow: 0 0 0 3px ${theme.colors.yellow7}, 0 0 0 4px ${theme.colors.yellow7};
    }

    ${SignUpWrapper} &, ${SignInWrapper} & {
      max-width: 40rem;
      width: 100%;
      margin-top: ${theme.space.sm};
    }

    @media ${theme.media.lessThan('medium')} {
      ${ProfileInfo} & {
        width: 100%;
      }
    }
  `}
`;
