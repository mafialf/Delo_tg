// pages/api/appointments/confirm.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const { id } = req.body;
  const telegramUsername = window.Telegram.WebApp.initDataUnsafe.user.username;

  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status: 'подтверждено' })
      .eq('id', id)
      .eq('master_telegram_username', telegramUsername);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Запись подтверждена.' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка подтверждения записи' });
  }
}