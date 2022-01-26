import styled, { css } from 'styled-components';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export const DropdownMenuTrigger = styled(DropdownMenuPrimitive.Trigger)`
  ${({ theme }) => css`
    cursor: pointer;
    color: ${theme.colors.sand12};

    img {
      border-radius: 9999px;
    }
  `}
`;

export const DropdownMenuContent = styled(DropdownMenuPrimitive.Content)`
  ${({ theme }) => css`
    min-width: 176px;
    background: ${theme.colors.sand2};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: ${theme.radii.base};
    animation: slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes slideDownAndFade {
      0% {
        opacity: 0;
        transform: translateY(-2px);
      }

      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}
`;

export const DropdownMenuItem = styled(DropdownMenuPrimitive.Item)`
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

export const DropdownMenuSeparator = styled(DropdownMenuPrimitive.Separator)`
  ${({ theme }) => css`
    height: 1px;
    background-color: ${theme.colors.sand6};
  `}
`;

export const DropdownMenuArrow = styled(DropdownMenuPrimitive.Arrow)`
  ${({ theme }) => css`
    fill: ${theme.colors.sand3};
  `}
`;
