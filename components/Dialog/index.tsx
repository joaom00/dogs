import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { CloseIcon } from '@/icons';

import * as S from './styles';

const Dialog = ({ children, ...props }: DialogPrimitive.DialogProps) => {
  return (
    <DialogPrimitive.Root {...props}>
      <S.DialogOverlay />
      {children}
    </DialogPrimitive.Root>
  );
};

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogPrimitive.DialogTitleProps>(
  ({ children, ...props }, forwardedRef) => (
    <S.DialogTitleWrapper>
      <S.DialogTitle {...props} ref={forwardedRef}>
        {children}
      </S.DialogTitle>
    </S.DialogTitleWrapper>
  )
);

DialogTitle.displayName = 'DialogTitle';

const DialogContent = React.forwardRef<HTMLDivElement, DialogPrimitive.DialogContentProps>(
  ({ children, ...props }, forwardedRef) => (
    <S.DialogContent {...props} ref={forwardedRef}>
      {children}
      <S.DialogClose>
        <CloseIcon />
      </S.DialogClose>
    </S.DialogContent>
  )
);

DialogContent.displayName = 'DialogContent';

export { Dialog as Root, DialogTitle as Title, DialogContent as Content };
