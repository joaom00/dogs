import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { DialogProps, Portal, Root } from '@radix-ui/react-dialog';
import toast from 'react-hot-toast';

import { supabase } from '@/lib/supabase';
import { useUser } from '@/context/AuthContext';

import { CloseIcon } from '@/icons';
import { FileInput, Spinner } from '@/components';

import * as S from './styles';

type FormValues = {
  description: string;
  files: Array<File>;
};

const AddPostDialog = (props: DialogProps) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const methods = useForm<FormValues>({ shouldUnregister: true });

  const createPost = async (data: FormValues) => {
    const file = data.files[0];
    const dateTime = new Date().getTime();
    const fileName = `${dateTime}-${user?.id}-${file.name}`;

    await supabase.storage.from('photos').upload(fileName, file);

    const { publicURL } = supabase.storage.from('photos').getPublicUrl(fileName);

    await supabase
      .from('posts')
      .insert([{ image_url: publicURL, description: data.description, user_id: user?.id }]);
  };

  const createPostMutation = useMutation(createPost, {
    onSuccess: () =>
      queryClient.invalidateQueries([{ scope: 'profile', username: user?.user_metadata.username }]),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    createPostMutation.mutate(data, {
      onSuccess: () => {
        props.onOpenChange!(false);
      },
    });
  };

  return (
    <Root open={props.open} onOpenChange={props.onOpenChange} {...props}>
      <Portal>
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
      </Portal>
    </Root>
  );
};

export default AddPostDialog;
