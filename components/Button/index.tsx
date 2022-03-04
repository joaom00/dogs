import React from 'react';
import { Spinner } from '../Spinner';

import * as S from './styles';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'small', loading = false, children, ...props }, forwardedRef) => (
    <S.Wrapper type="button" variant={variant} size={size} {...props} ref={forwardedRef}>
      {loading && <Spinner />}
      {children}
    </S.Wrapper>
  )
);

Button.displayName = 'Button';
