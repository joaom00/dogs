import React from 'react';
import { DialogProps, Portal, Root } from '@radix-ui/react-dialog';

import { CloseIcon } from '@/icons';

import * as S from './styles';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import FileInput from '../FileInput';
import { supabase } from '@/lib/supabase';
import { useUser } from '@/context/AuthContext';
import toast from 'react-hot-toast';

type FormValues = {
  description: string;
  files: Array<File>;
};

export default function NewPostDialog(props: DialogProps) {
  const { user } = useUser();
  const methods = useForm<FormValues>({ shouldUnregister: true });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const file = data.files[0];
    toast.promise(
      (async () => {
        await supabase.storage.from('photos').upload(file.name, file);
        const { publicURL } = supabase.storage.from('photos').getPublicUrl(file.name);
        await supabase
          .from('posts')
          .insert([{ image_url: publicURL, description: data.description, user_id: user?.id }]);
      })(),
      {
        loading: 'Criando publicação',
        success: 'Publicação criada!',
        error: 'Algo deu errado',
      }
    );
  };

  return (
    <Root open={props.open} onOpenChange={props.onOpenChange} {...props}>
      <Portal>
        <S.DialogOverlay>
          <S.DialogContent asChild>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <S.DialogTitleWrapper>
                <S.DialogTitle>Criar nova publicação</S.DialogTitle>
                <S.SendButton type="submit">Compartilhar</S.SendButton>
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
}
