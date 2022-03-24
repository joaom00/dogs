import React from 'react';
import styled, { css } from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const Root = DropdownMenu.Root;

const Trigger = styled(DropdownMenu.Trigger)`
  ${({ theme }) => css`
    cursor: pointer;
    color: ${theme.colors.sand12};

    img {
      border-radius: 9999px;
    }
  `}
`;

const ContentStyles = styled(DropdownMenu.Content)`
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

const Content = React.forwardRef<HTMLDivElement, DropdownMenu.DropdownMenuContentProps>(
  (props, forwardedRef) => {
    return (
      <ContentStyles {...props} ref={forwardedRef}>
        {props.children}
        <Arrow />
      </ContentStyles>
    );
  }
);

Content.displayName = 'DropdownMenuContent';

const Item = styled(DropdownMenu.Item)`
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

const Separator = styled(DropdownMenu.Separator)`
  ${({ theme }) => css`
    height: 1px;
    background-color: ${theme.colors.sand6};
  `}
`;

const Arrow = styled(DropdownMenu.Arrow)`
  ${({ theme }) => css`
    fill: ${theme.colors.sand3};
  `}
`;

export { Root, Trigger, Content, Item, Separator };
