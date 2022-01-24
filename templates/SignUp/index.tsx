import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  username: string;
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const validationSchema = yup.object({
  email: yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
  name: yup.string().required('Campo obrigatório'),
  username: yup.string().required('Campo obrigatório'),
  password: yup.string().min(6, 'No mínimo 6 caracteres').required('Campo obrigatório'),
  confirm_password: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem corresponder'),
});

export default function SignUpTemplate() {
  const [status, setStatus] = React.useState<'idle' | 'loading'>('idle');

  const router = useRouter();
  const resolver = useYupValidationResolver(validationSchema);
  const methods = useForm<FormValues>({ resolver });

  async function handleEmailInputBlur() {
    const email = methods.getValues('email');
    if (!email) return;

    const { data } = await supabase.from('profiles').select('email').eq('email', email);

    if (data && data[0]) {
      methods.setError('email', {
        type: 'custom',
        message: 'Endereço de e-mail já cadastrado',
      });
      return;
    }

    const fieldState = methods.getFieldState('email');

    if (fieldState.error?.type !== 'custom') return;

    methods.clearErrors('email');
  }

  async function handleUsernameInputBlur() {
    const username = methods.getValues('username');
    if (!username) return;

    const { data } = await supabase.from('profiles').select('username').eq('username', username);

    if (data && data[0]) {
      methods.setError('username', {
        type: 'custom',
        message: 'Nome de usuário já existe',
      });
      return;
    }

    const fieldState = methods.getFieldState('username');

    if (fieldState.error?.type !== 'custom') return;

    methods.clearErrors('username');
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setStatus('loading');
    const { error } = await supabase.auth.signUp(
      {
        email: data.email,
        password: data.password,
      },
      {
        data: {
          name: data.name,
          username: data.username,
          email: data.email,
        },
      }
    );

    if (error) {
      if (error.message === 'User already registered') {
        methods.setError('email', {
          type: 'custom',
          message: 'Endereço de e-mail já cadastrado',
        });
      }
      setStatus('idle');
      return toast.error(messageMapper(error.message));
    }

    setStatus('idle');
    toast.success('Deu tudo certo ao criar sua conta!');
    router.push('/login');
  };

  return (
    <FormProvider {...methods}>
      <S.Wrapper>
        <S.SignUpWrapper onSubmit={methods.handleSubmit(onSubmit)}>
          <S.Title>Cadastre-se</S.Title>
          <S.Description>Crie uma conta gratuitamente!</S.Description>

          <TextField name="email" label="E-mail" onBlur={handleEmailInputBlur} />

          <TextField name="name" label="Nome" />

          <TextField name="username" label="Nome de usuário" onBlur={handleUsernameInputBlur} />

          <TextField name="password" label="Senha" type="password" />

          <TextField name="confirm_password" label="Confirmar senha" type="password" />

          <Button type="submit" size="medium">
            {status === 'loading' && <Spinner />}
            Criar conta
          </Button>

          <p style={{ marginTop: 16 }}>
            Já possui conta?{' '}
            <Link href="/login" passHref>
              <S.BackToLogin>Entre agora</S.BackToLogin>
            </Link>
          </p>
        </S.SignUpWrapper>

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
