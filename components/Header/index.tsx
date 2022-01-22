import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { HiOutlineHome } from 'react-icons/hi';

import { supabase } from '@/lib/supabase';
import { useUser } from '@/context/AuthContext';

import Logo from '@/components/Logo';
import NewPostDialog from '@/components/NewPostDialog';

import * as S from './styles';

export default function Header() {
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [openNewPostDialog, setOpenNewPostDialog] = React.useState(false);
  const [avatarUrl, setAvatarUrl] = React.useState('');

  const { user } = useUser();

  const router = useRouter();

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

  React.useEffect(() => {
    async function getProfile() {
      const { data } = await supabase
        .from('profiles')
        .select('avatar_url')
        .match({ email: user?.email });

      if (data?.length) setAvatarUrl(data[0].avatar_url);
    }

    getProfile();
  }, [user]);

  return (
    <S.Wrapper>
      <S.Container>
        <Logo />
        <S.NavList>
          <li>
            <Link href="/" passHref>
              <a>
                <HiOutlineHome size={24} color="#1B1B18" />
              </a>
            </Link>
          </li>
          {user ? (
            <li>
              <S.DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                <S.DropdownMenuTrigger>
                  <Image
                    src={
                      avatarUrl ||
                      'https://schveufltdgsfxvyzrwb.supabase.in/storage/v…5NTF9.Yy91yZJX1O_8VG3Gjkr1QXoaRFUigbchHaD20hhHF9A'
                    }
                    width={24}
                    height={24}
                    alt="foto"
                  />
                </S.DropdownMenuTrigger>

                <S.DropdownMenuContent sideOffset={5}>
                  <Link href={`/${user?.user_metadata.username}`} passHref>
                    <S.DropdownMenuItem asChild>
                      <a onClick={onDropdownClose}>Perfil</a>
                    </S.DropdownMenuItem>
                  </Link>

                  <S.DropdownMenuItem asChild>
                    <button onClick={onPostDialogOpen}>Nova foto</button>
                  </S.DropdownMenuItem>

                  <Link href="/conta/editar" passHref>
                    <S.DropdownMenuItem asChild>
                      <a onClick={onDropdownClose}>Configurações</a>
                    </S.DropdownMenuItem>
                  </Link>

                  <S.DropdownMenuSeparator />

                  <S.DropdownMenuItem asChild>
                    <button onClick={handleSignOut}>Sair</button>
                  </S.DropdownMenuItem>

                  <S.DropdownMenuArrow />
                </S.DropdownMenuContent>
              </S.DropdownMenu>
            </li>
          ) : null}
        </S.NavList>
      </S.Container>

      <NewPostDialog open={openNewPostDialog} onOpenChange={setOpenNewPostDialog} />
    </S.Wrapper>
  );
}
