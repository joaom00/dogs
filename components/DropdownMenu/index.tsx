import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import * as S from './styles';

const DropdownMenu = (props: DropdownMenuPrimitive.DropdownMenuProps) => {
  return <DropdownMenuPrimitive.Root {...props} />;
};

const DropdownMenuTrigger = (props: DropdownMenuPrimitive.DropdownMenuTriggerProps) => {
  return <S.DropdownMenuTrigger {...props} />;
};

const DropdownMenuContent = (props: DropdownMenuPrimitive.DropdownMenuContentProps) => {
  return (
    <S.DropdownMenuContent>
      {props.children}
      <S.DropdownMenuArrow />
    </S.DropdownMenuContent>
  );
};

const DropdownMenuItem = (props: DropdownMenuPrimitive.DropdownMenuItemProps) => {
  return <S.DropdownMenuItem {...props} />;
};

const DropdownMenuSeparator = (props: DropdownMenuPrimitive.DropdownMenuSeparatorProps) => {
  return <S.DropdownMenuSeparator {...props} />;
};

export {
  DropdownMenu as Root,
  DropdownMenuTrigger as Trigger,
  DropdownMenuContent as Content,
  DropdownMenuItem as Item,
  DropdownMenuSeparator as Separator,
};
