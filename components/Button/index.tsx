import React from 'react';

import * as S from './styles';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'small', children, ...props }, forwardedRef) => (
    <S.Wrapper type="button" variant={variant} size={size} {...props} ref={forwardedRef}>
      {children}
    </S.Wrapper>
  )
);

Button.displayName = 'Button';
