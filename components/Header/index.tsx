import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { supabase } from '@/lib/supabase';
import { useUser } from '@/context/AuthContext';

import { HomeIcon } from '@/icons';
import { Logo, AddPostDialog, DropdownMenu } from '@/components';

import * as S from './styles';

const Header = () => {
  const { user } = useUser();

  const router = useRouter();

  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [isAddPostOpen, setIsAddPostOpen] = React.useState(false);

  const { data } = useQuery(
    ['header_image'],
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
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
            {user && (
              <li>
                <DropdownMenu.Root open={openDropdown} onOpenChange={setOpenDropdown}>
                  <DropdownMenu.Trigger>
                    <Image
                      src={
                        data?.avatar_url ||
                        'https://schveufltdgsfxvyzrwb.supabase.in/storage/v1/object/public/avatars/user.jpg'
                      }
                      width={24}
                      height={24}
                      objectFit="cover"
                      alt="foto"
                    />
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
                        {/* <button onClick={onPostDialogOpen}>Nova foto</button> */}
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
            )}
          </S.NavList>
        </S.Container>
      </S.Wrapper>
    </>
  );
};

export default Header;
