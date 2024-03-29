import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { useUser } from '@context/AuthContext';
import { supabase } from '@lib/supabase';
import { postKeys } from '@lib/queryFactory';

import { CloseIcon } from '@/icons';
import { FileInput } from '@components/FileInput';
import { Spinner } from '@components/Spinner';

import * as S from './styles';

type FormValues = {
  description: string;
  files: Array<File>;
};

export const AddPostDialog = (props: DialogPrimitive.DialogProps) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const methods = useForm<FormValues>({ shouldUnregister: true });

  const createPost = async (data: FormValues) => {
    const file = data.files[0];
    const dateTime = new Date().getTime();
    const fileName = `${dateTime}-${user?.id}-${file.name}`;

    await supabase.storage.from('photos').upload(fileName, file);

    const { publicURL } = supabase.storage.from('photos').getPublicUrl(fileName);

    await supabase.from('posts').insert([
      {
        image_url: publicURL,
        description: data.description,
        user_username: user?.user_metadata.username,
      },
    ]);
  };

  const createPostMutation = useMutation(createPost, {
    onSuccess: () => queryClient.invalidateQueries(postKeys.profile(user?.user_metadata.username)),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    createPostMutation.mutate(data, {
      onSuccess: () => {
        props.onOpenChange!(false);
      },
    });
  };

  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Trigger asChild>{props.children}</DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <S.DialogOverlay>
          <S.DialogContent asChild>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <S.DialogTitleWrapper>
                <S.DialogTitle>Criar nova publicação</S.DialogTitle>

                <S.SendButton type="submit" disabled={createPostMutation.isLoading}>
                  {createPostMutation.isLoading && <Spinner />}
                  Compartilhar
                </S.SendButton>
              </S.DialogTitleWrapper>

              <S.DialogContentMain>
                <FormProvider {...methods}>
                  <FileInput accept="image/png, image/jpg, image/jpeg" name="files" />

                  <S.DialogRightContentMain>
                    <S.Textarea
                      {...methods.register('description', { required: true })}
                      rows={10}
                      placeholder="Escreva uma legenda"
                    ></S.Textarea>
                  </S.DialogRightContentMain>
                </FormProvider>
              </S.DialogContentMain>
            </form>
          </S.DialogContent>

          <S.DialogClose>
            <CloseIcon size={26} />
          </S.DialogClose>
        </S.DialogOverlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
