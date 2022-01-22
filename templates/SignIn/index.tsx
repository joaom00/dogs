import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';

import { supabase } from '@/lib/supabase';

import { useYupValidationResolver } from '@/hooks';
import { messageMapper } from '@/utils';

import { Button, TextField, Spinner } from '@/components';

import * as S from './styles';

type FormValues = {
  email: string;
  password: string;
};

const validationSchema = yup.object({
  email: yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
});

export default function SignInTemplate() {
  const [status, setStatus] = React.useState<'idle' | 'loading'>('idle');

  const router = useRouter();
  const resolver = useYupValidationResolver(validationSchema);
  const methods = useForm<FormValues>({ resolver });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setStatus('loading');
    const { error } = await supabase.auth.signIn({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setStatus('idle');
      return toast.error(messageMapper(error.message));
    }

    setStatus('idle');
    router.push('/');
  };

  return (
    <FormProvider {...methods}>
      <S.Wrapper>
        <S.SignInWrapper onSubmit={methods.handleSubmit(onSubmit)}>
          <S.Title>Iniciar Sessão</S.Title>
          <S.Description>Já possui uma conta? Faça login aqui embaixo.</S.Description>

          <TextField name="email" type="email" label="E-mail" />

          <TextField name="password" type="password" label="Senha" />

          <Button type="submit" size="medium">
            {status === 'loading' && <Spinner />}
            Entrar
          </Button>

          <S.LinksWrapper>
            <p>
              Não tem conta?{' '}
              <Link href="/criar-conta" passHref>
                <S.SignUpLink>Crie uma</S.SignUpLink>
              </Link>
            </p>
            <Link href="/esqueci-senha" passHref>
              <S.ForgotPasswordLink>Esqueci minha senha</S.ForgotPasswordLink>
            </Link>
          </S.LinksWrapper>
        </S.SignInWrapper>
        <div style={{ position: 'relative', height: '100vh' }}>
          <Image
            src="/static/images/login.jpg"
            layout="fill"
            objectFit="cover"
            alt="foto ilustrativa"
          />
        </div>
      </S.Wrapper>
    </FormProvider>
  );
}
