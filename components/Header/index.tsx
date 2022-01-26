import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { HiOutlineHome } from 'react-icons/hi';

import { supabase } from '@/lib/supabase';
import { useUser } from '@/context/AuthContext';

import { Logo, AddPostDialog, DropdownMenu } from '@/components';

import * as S from './styles';

export default function Header() {
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [openNewPostDialog, setOpenNewPostDialog] = React.useState(false);

  const { user } = useUser();

  const router = useRouter();

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

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  function onDropdownClose() {
    setOpenDropdown(false);
  }

  function onPostDialogOpen() {
    setOpenNewPostDialog(true);
  }

  return (
    <>
      <S.Wrapper>
        <S.Container>
          <Logo />
          <S.NavList>
            <li>
              <Link href="/">
                <a>
                  <HiOutlineHome size={24} color="#1B1B18" />
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

                  <DropdownMenu.Content sideOffset={5}>
                    <Link href={`/${user?.user_metadata.username}`} passHref>
                      <DropdownMenu.Item asChild>
                        <a onClick={onDropdownClose}>Perfil</a>
                      </DropdownMenu.Item>
                    </Link>

                    <DropdownMenu.Item asChild>
                      <button onClick={onPostDialogOpen}>Nova foto</button>
                    </DropdownMenu.Item>

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
      <AddPostDialog open={openNewPostDialog} onOpenChange={setOpenNewPostDialog} />
    </>
  );
}
