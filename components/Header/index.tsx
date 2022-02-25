import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { supabase } from '@/lib/supabase';
import { useUser } from '@/context/AuthContext';

import { HomeIcon } from '@/icons';
import { Logo } from '@components/Logo';
import { AddPostDialog } from '@components/AddPostDialog';
import * as DropdownMenu from '@components/DropdownMenu';
import { Avatar, AvatarFallback } from '@components/Avatar';

import * as S from './styles';

export const Header = () => {
  const { user } = useUser();

  const router = useRouter();

  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [isAddPostOpen, setIsAddPostOpen] = React.useState(false);

  const profileAvatar = useQuery(
    ['avatar', user?.user_metadata.username],
    async () => {
      const { data } = await supabase
        .from('profiles')
        .select('avatar_url')
        .match({ username: user?.user_metadata.username });

      if (data?.length) return data[0];
    },
    {
      staleTime: Infinity,
    }
  );

  const handleSignOut = () => {
    supabase.auth.signOut();
    router.push('/login');
  };

  const onDropdownClose = () => setOpenDropdown(false);

  return (
    <>
      <S.Wrapper>
        <S.Container>
          <Logo />
          <S.NavList>
            <li>
              <Link href="/">
                <a>
                  <HomeIcon size={24} color="#1B1B18" />
                </a>
              </Link>
            </li>

            <li>
              <DropdownMenu.Root open={openDropdown} onOpenChange={setOpenDropdown}>
                <DropdownMenu.Trigger>
                  <Avatar>
                    <S.AvatarImage
                      src={profileAvatar.data?.avatar_url}
                      alt={`Foto de perfil de ${user?.user_metadata.username}`}
                    />
                    <AvatarFallback>
                      <S.AvatarFallback />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content sideOffset={5} hidden={isAddPostOpen}>
                  <Link href={`/${user?.user_metadata.username}`} passHref>
                    <DropdownMenu.Item asChild>
                      <a onClick={onDropdownClose}>Perfil</a>
                    </DropdownMenu.Item>
                  </Link>

                  <AddPostDialog open={isAddPostOpen} onOpenChange={setIsAddPostOpen}>
                    <DropdownMenu.Item onSelect={(event) => event.preventDefault()}>
                      Nova foto
                    </DropdownMenu.Item>
                  </AddPostDialog>

                  <Link href="/conta/editar" passHref>
                    <DropdownMenu.Item asChild>
                      <a onClick={onDropdownClose}>Configurações</a>
                    </DropdownMenu.Item>
                  </Link>

                  <DropdownMenu.Separator />

                  <DropdownMenu.Item asChild>
                    <button onClick={handleSignOut}>Sair</button>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </li>
          </S.NavList>
        </S.Container>
      </S.Wrapper>
    </>
  );
};
