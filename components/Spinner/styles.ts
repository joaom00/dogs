import styled, { css } from 'styled-components';

type WrapperProps = {
  size?: number;
};

export const Wrapper = styled.svg<WrapperProps>`
  ${({ theme, size }) => css`
    width: ${size}px;
    height: ${size}px;
    color: ${theme.colors.yellow12};

    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }

    animation: spin 1s linear infinite;
  `}
`;
