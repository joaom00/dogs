import styled, { css } from 'styled-components';

export const Box = styled.ul`
  ${({ theme }) => css`
    padding-top: ${theme.space.lg};

    li + li {
      margin-top: ${theme.space.md};
    }
  `}
`;

export const SpinnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 72px;
`;
