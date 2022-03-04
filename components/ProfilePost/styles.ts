import styled, { css } from 'styled-components';

export const Box = styled.li`
  display: grid;
  grid-template-columns: 1fr;
  cursor: pointer;
`;

export const Link = styled.a`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr;

    img {
      grid-area: 1/1;
      width: 100%;
      max-width: 29.3rem;
      min-width: 12.3rem;
      height: 100%;
      max-height: 29.3rem;
      min-height: 12.3rem;
      object-fit: cover;
      display: block;

      @media ${theme.media.greaterThan('small')} {
        height: 29.3rem;
      }
    }
  `}
`;

export const Overlay = styled.div`
  ${({ theme }) => css`
    grid-area: 1/1;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2;

    display: none;
    justify-content: center;
    align-items: center;
    gap: ${theme.space.md};

    color: white;

    ${Link}:hover & {
      display: flex;
    }

    span {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
  `}
`;
