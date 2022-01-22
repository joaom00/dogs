import styled, { css } from 'styled-components';

export const Wrapper = styled.ul`
  ${({ theme }) => css`
    padding-top: ${theme.space.lg};

    li + li {
      margin-top: ${theme.space.md};
    }
  `}
`;
