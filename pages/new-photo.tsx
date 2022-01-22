import { supabase } from '@/lib/supabase';
import React from 'react';

export default function NewPhoto() {
  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];

    const res = await supabase.storage.from('photos').upload('public/avatar2.png', file, {
      cacheControl: '3600',
      upsert: false,
    });

    console.log(res);
  }

  function onClick() {
    const res = supabase.storage.from('photos').getPublicUrl('avatar1.png');

    console.log(res);
  }

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <button onClick={onClick}>pegar url</button>
    </div>
  );
}
