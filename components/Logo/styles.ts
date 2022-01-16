import styled, { css, DefaultTheme } from 'styled-components';

type LogoProps = {
  color: 'black' | 'yellow';
  size: 'normal' | 'large';
};

const modifiers = {
  black: (theme: DefaultTheme) => css`
    color: ${theme.colors.sand12};
  `,

  yellow: (theme: DefaultTheme) => css`
    color: ${theme.colors.yellow10};
  `,

  normal: () => css`
    height: 2.5rem;
  `,

  large: () => css`
    height: 3.4rem;
  `,
};

export const Wrapper = styled.a<LogoProps>`
  ${({ theme, color, size }) => css`
    display: flex;
    align-items: center;

    svg {
      height: 100%;
    }

    ${modifiers[color](theme)}
    ${modifiers[size]}
  `}
`;
