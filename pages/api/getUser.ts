import type { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/lib/supabase';

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.token as string;

  const { data: user, error } = await supabase.auth.api.getUser(token);

  if (error) return res.status(401).json({ error: error.message });

  return res.status(200).json(user);
};

export default getUser;
