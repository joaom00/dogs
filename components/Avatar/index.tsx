import React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

type AvatarProps = AvatarPrimitive.PrimitiveImageProps;

export const Avatar = (props: AvatarProps) => {
  return <AvatarPrimitive.Root {...props} />;
};

type AvatarImageProps = AvatarPrimitive.PrimitiveImageProps;

export const AvatarImage = (props: AvatarImageProps) => {
  return <AvatarPrimitive.Image {...props} />;
};

type AvatarFallbackProps = AvatarPrimitive.AvatarFallbackProps;

export const AvatarFallback = ({ children, ...props }: AvatarFallbackProps) => {
  const child = React.Children.only(children) as React.ReactElement;

  const comp = React.cloneElement(child, {
    src: 'https://schveufltdgsfxvyzrwb.supabase.in/storage/v1/object/public/avatars/user.jpg',
    ...child.props,
  });

  return <AvatarPrimitive.Fallback {...props}>{comp}</AvatarPrimitive.Fallback>;
};
