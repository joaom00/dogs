import React from 'react';
import {
  DialogProps,
  DialogContentProps,
  DialogTitleProps,
  Root,
  Trigger,
} from '@radix-ui/react-dialog';

import { CloseIcon } from '@/icons';

import * as S from './styles';

export function Dialog({ children, ...props }: DialogProps) {
  return (
    <Root {...props}>
      <S.DialogOverlay />
      {children}
    </Root>
  );
}

export const DialogTrigger = Trigger;

export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ children, ...props }, forwardedRef) => (
    <S.DialogTitleWrapper>
      <S.DialogTitle {...props} ref={forwardedRef}>
        {children}
      </S.DialogTitle>
    </S.DialogTitleWrapper>
  )
);

DialogTitle.displayName = 'DialogTitle';

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
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
