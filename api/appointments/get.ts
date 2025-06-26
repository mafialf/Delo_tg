// pages/api/appointments/get.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const telegramId = window.Telegram.WebApp.initDataUnsafe.user.id;

  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .or(`client_telegram_id.eq.${telegramId},master_telegram_username.eq.@${window.Telegram.WebApp.initDataUnsafe.user.username}`);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Произошла ошибка' });
  }
}