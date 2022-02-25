import React from 'react';
import { DialogProps, DialogContentProps, DialogTitleProps, Root } from '@radix-ui/react-dialog';

import { CloseIcon } from '@/icons';

import * as S from './styles';

const Dialog = ({ children, ...props }: DialogProps) => {
  return (
    <Root {...props}>
      <S.DialogOverlay />
      {children}
    </Root>
  );
};

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ children, ...props }, forwardedRef) => (
    <S.DialogTitleWrapper>
      <S.DialogTitle {...props} ref={forwardedRef}>
        {children}
      </S.DialogTitle>
    </S.DialogTitleWrapper>
  )
);

DialogTitle.displayName = 'DialogTitle';

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
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
