import React, { InputHTMLAttributes } from 'react';
import { Path, useFormContext } from 'react-hook-form';

import * as S from './styles';

type FormValues = {
  username: string;
  name: string;
  email: string;
  password: string;
};

type TextFieldProps = {
  label: string;
  name: Path<FormValues>;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextField({ label, name, ...props }: TextFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <S.Wrapper>
      <div>
        <S.Label htmlFor={name}>{label}</S.Label>
        {errors[name] && <S.Error role="alert">{errors[name].message}</S.Error>}
      </div>

      <S.Input
        id={name}
        error={!!errors[name]}
        aria-invalid={errors[name] ? 'true' : 'false'}
        {...register(name)}
        {...props}
      />
    </S.Wrapper>
  );
}
