import { HeartIcon, ChatIcon } from '@/icons';

import * as S from './styles';

export default function Post() {
  return (
    <S.Wrapper>
      <S.PostHeader>
        <img src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        <p>lucasmontano</p>
      </S.PostHeader>
      <S.PostImage src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
      <S.PostActions>
        <HeartIcon size={24} />
        <ChatIcon size={24} />
      </S.PostActions>
      <S.PostLikes>563 curtidas</S.PostLikes>
      <S.PostDescription>
        <strong>lucasmontano</strong> tenho pensando no motivo pelo qual esse vídeo está tendo tanto
        alcance e eu diria que podemos resumir em uma palavra:...
      </S.PostDescription>
      <S.PostShowAllComments>Ver todos os 10 comentários</S.PostShowAllComments>
      <div>
        <p></p>
        <p></p>
      </div>
      <S.PostCreatedInfo>há 1 dia</S.PostCreatedInfo>
    </S.Wrapper>
  );
}
