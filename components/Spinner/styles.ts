import styled, { css } from 'styled-components';

export const Wrapper = styled.svg`
  ${({ theme, width, height }) => css`
    width: ${width}px;
    height: ${height}px;
    color: ${theme.colors.yellow12};

    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }

    animation: spin 1s linear infinite;
  `}
`;
