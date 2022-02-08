import styled, { css } from 'styled-components';

export const Wrapper = styled.ul`
  ${({ theme }) => css`
    padding-top: ${theme.space.lg};

    li + li {
      margin-top: ${theme.space.md};
    }
  `}
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 72px;
`;
