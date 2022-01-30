import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import * as S from './styles';

const DropdownMenu = (props: DropdownMenuPrimitive.DropdownMenuProps) => {
  return <DropdownMenuPrimitive.Root {...props} />;
};

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuPrimitive.DropdownMenuTriggerProps
>((props, forwardedRef) => {
  return <S.DropdownMenuTrigger {...props} ref={forwardedRef} />;
});

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuContentProps
>((props, forwardedRef) => {
  return (
    <S.DropdownMenuContent {...props} ref={forwardedRef}>
      {props.children}
      <S.DropdownMenuArrow />
    </S.DropdownMenuContent>
  );
});

DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuItemProps
>((props, forwardedRef) => {
  return <S.DropdownMenuItem {...props} ref={forwardedRef} />;
});

DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuSeparatorProps
>((props, forwardedRef) => {
  return <S.DropdownMenuSeparator {...props} ref={forwardedRef} />;
});

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export {
  DropdownMenu as Root,
  DropdownMenuTrigger as Trigger,
  DropdownMenuContent as Content,
  DropdownMenuItem as Item,
  DropdownMenuSeparator as Separator,
};
