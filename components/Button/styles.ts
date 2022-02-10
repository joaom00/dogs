import styled, { css, DefaultTheme } from 'styled-components';

import { ProfileInfo } from '@/templates/Profile/styles';
import { SignUpWrapper } from '@/templates/SignUp/styles';
import { SignInWrapper } from '@/templates/SignIn/styles';

type WrapperProps = {
  variant: 'primary' | 'secondary';
  size: 'small' | 'medium';
};

const modifiers = {
  primary: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.yellow9};

    &:hover {
      background-color: ${theme.colors.yellow10};
    }

    &:disabled {
      background-color: ${theme.colors.yellow6};
    }

    &:focus {
      box-shadow: 0 0 0 3px ${theme.colors.yellow7}, 0 0 0 4px ${theme.colors.yellow7};
    }
  `,

  secondary: (theme: DefaultTheme) => css`
    border: 1.5px solid ${theme.colors.sand6};

    &:focus {
      box-shadow: 0 0 0 3px ${theme.colors.yellow4};
      border-color: ${theme.colors.yellow7};
    }
  `,

  small: (theme: DefaultTheme) => css`
    padding: ${theme.space.xs} ${theme.space.sm};
    font-size: ${theme.font.sizes.small};
  `,

  medium: (theme: DefaultTheme) => css`
    padding: 1.2rem ${theme.space.md};
  `,
};

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, variant, size }) => css`
    color: ${theme.colors.yellow12};
    font-weight: ${theme.font.bold};
    transition: all 0.1s;
    letter-spacing: 0.08em;
    border-radius: ${theme.radii.base};

    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${theme.space.xs};

    ${modifiers[variant](theme)}
    ${modifiers[size](theme)};

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
