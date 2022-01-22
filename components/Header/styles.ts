import styled, { css, keyframes } from 'styled-components';

import { Arrow, Content, Item, Root, Separator, Trigger } from '@radix-ui/react-dropdown-menu';

const slideDownAndFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-2px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

export const DropdownMenu = styled(Root)``;

export const DropdownMenuTrigger = styled(Trigger)`
  ${({ theme }) => css`
    cursor: pointer;
    color: ${theme.colors.sand12};
  `}
`;

export const DropdownMenuContent = styled(Content)`
  ${({ theme }) => css`
    min-width: 176px;
    background: ${theme.colors.sand2};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: ${theme.radii.base};
    animation: ${slideDownAndFade} 400ms cubic-bezier(0.16, 1, 0.3, 1);
  `}
`;

export const DropdownMenuItem = styled(Item)`
  ${({ theme }) => css`
    display: flex;
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.sand12};
    user-select: none;
    cursor: pointer;
    padding: ${theme.space.sm};
    width: 100%;

    &:focus {
      outline: none;
      background-color: ${theme.colors.sand4};
    }
  `}
`;

export const DropdownMenuSeparator = styled(Separator)`
  ${({ theme }) => css`
    height: 1px;
    background-color: ${theme.colors.sand6};
  `}
`;

export const DropdownMenuArrow = styled(Arrow)`
  ${({ theme }) => css`
    fill: ${theme.colors.sand3};
  `}
`;
