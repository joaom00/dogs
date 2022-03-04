import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import * as yup from 'yup';

import { supabase } from '@/lib/supabase';
import { useYupValidationResolver } from '@/hooks';

import { Button } from '@/components/Button';
import { Avatar } from '@components/Avatar';

import { useProfileEdit, useUpdateProfile } from './queries';

import * as S from './styles';

type FormValues = {
  username: string;
  name: string;
  email: string;
  avatar_url: string;
};

const validationSchema = yup.object({
  email: yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
  name: yup.string().required('Campo obrigatório'),
  username: yup.string().required('Campo obrigatório'),
});

export const EditProfile = () => {
  const profile = useProfileEdit();
  const updateProfile = useUpdateProfile();

  const resolver = useYupValidationResolver(validationSchema);
  const methods = useForm<FormValues>({
    resolver,
    defaultValues: {
      username: profile.data?.username,
      email: profile.data?.email,
      name: profile.data?.name,
      avatar_url: profile.data?.avatar_url,
    },
  });

  function getFilePreview() {
    const avatar = methods.getValues('avatar_url') as unknown as FileList;

    if (avatar?.length > 0) {
      return URL.createObjectURL(avatar.item(0) as Blob);
    }

    return profile.data?.avatar_url;
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    let usernameResponse: PostgrestFilterBuilder<any> | undefined;
    let emailResponse: PostgrestFilterBuilder<any> | undefined;

    if (profile.data?.username !== data.username) {
      usernameResponse = supabase
        .from('profiles')
        .select('username', { count: 'exact' })
        .eq('username', data.username);
    }

    if (profile.data?.email !== data.email) {
      emailResponse = supabase
        .from('profiles')
        .select('email', { count: 'exact' })
        .eq('email', data.email);
    }

    const [username, email] = await Promise.all([usernameResponse, emailResponse]);

    if (!!username?.count) {
      methods.setError('username', {
        type: 'custom',
        message: 'Nome de usuário já existe',
      });
    }

    if (!!email?.count) {
      methods.setError('email', {
        type: 'custom',
        message: 'Endereço de e-mail já cadastrado',
      });
    }

    const fieldUsernameState = methods.getFieldState('username');
    const hasUsernameError = fieldUsernameState.error?.type === 'custom';

    const fieldEmailState = methods.getFieldState('email');
    const hasEmailError = fieldEmailState.error?.type === 'custom';

    if (hasEmailError || hasUsernameError) return;

    updateProfile.mutate(
      { ...profile.data, ...data },
      {
        onSuccess: (data) => {
          methods.reset();

          methods.setValue('name', data.name);
          methods.setValue('username', data.username);
          methods.setValue('email', data.email);
          methods.setValue('avatar_url', data.avatar_url);

          toast.success('Seu perfil foi atualizado!');
        },
      }
    );
  };

  return (
    <S.Wrapper>
      <label>
        <Avatar src={getFilePreview()} alt="sua foto de perfil" size={184} />
        <input
          type="file"
          accept="image/jpg, image/png, image/jpeg"
          {...methods.register('avatar_url')}
          style={{ display: 'none' }}
        />
      </label>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <S.InputsWrapper>
          <S.InputsTitle>Seus dados</S.InputsTitle>

          <S.InputWrapper>
            <label htmlFor="username">Nome de usuário</label>
            <div>
              {methods.formState.errors.username && (
                <S.Error role="alert">{methods.formState.errors.username.message}</S.Error>
              )}
              <S.TextField
                id="username"
                type="text"
                error={!!methods.formState.errors.username}
                {...methods.register('username')}
              />
            </div>
          </S.InputWrapper>

          <S.InputWrapper>
            <label htmlFor="email">E-mail</label>
            <div>
              {methods.formState.errors.email && (
                <S.Error role="alert">{methods.formState.errors.email.message}</S.Error>
              )}
              <S.TextField
                id="email"
                type="text"
                error={!!methods.formState.errors.email}
                {...methods.register('email')}
              />
            </div>
          </S.InputWrapper>

          <S.InputWrapper>
            <label htmlFor="name">Nome</label>
            <div>
              {methods.formState.errors.name && (
                <S.Error role="alert">{methods.formState.errors.name.message}</S.Error>
              )}
              <S.TextField
                id="name"
                type="text"
                error={!!methods.formState.errors.name}
                {...methods.register('name')}
              />
            </div>
          </S.InputWrapper>
        </S.InputsWrapper>

        <Button
          type="submit"
          size="large"
          loading={updateProfile.isLoading}
          disabled={!methods.formState.isDirty}
        >
          Salvar
        </Button>
      </form>
    </S.Wrapper>
  );
};
