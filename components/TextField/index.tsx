import React, { InputHTMLAttributes } from 'react';
import { Path, useFormContext } from 'react-hook-form';

import * as S from './styles';

type TextFieldProps = {
  label: string;
  name: Path<Record<string, string>>;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextField({ label, name, ...props }: TextFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <S.Wrapper>
      <S.LabelWrapper>
        <label htmlFor={name}>{label}</label>
        {errors[name] && <S.Error role="alert">{errors[name].message}</S.Error>}
      </S.LabelWrapper>

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
