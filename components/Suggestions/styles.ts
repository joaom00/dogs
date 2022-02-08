import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.space['3xl']};
    display: flex;
    gap: ${theme.space['2xl']};
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}
`;

export const UserList = styled.ul`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.sand6};
    max-width: 600px;
    width: 100%;
    padding: ${theme.space.sm} ${theme.space.lg};
  `}
`;

export const User = styled.li`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-top: ${theme.space.md};

    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
    }

    a {
      margin-left: ${theme.space.sm};
    }

    button {
      margin-left: auto;
    }
  `}
`;
