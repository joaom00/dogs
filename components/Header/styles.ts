import styled, { css } from 'styled-components';
import { AvatarImage as AvatarImageComp } from '@/components/Avatar';

export const Wrapper = styled.header`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.sand6};
  `}
`;

export const Container = styled.nav`
  ${({ theme }) => css`
    width: 100%;
    max-width: ${theme.grid.container};
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: ${theme.space.sm} ${theme.space.xs};
  `}
`;

export const NavList = styled.ul`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space.md};
  `}
`;

export const AvatarImage = styled(AvatarImageComp)`
  width: 2.4rem;
  height: 2.4rem;
  object-fit: cover;
`;

export const AvatarFallback = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  object-fit: cover;
`;
