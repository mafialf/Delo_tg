// pages/api/appointments/select.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const { id } = req.body;
  const telegramId = window.Telegram.WebApp.initDataUnsafe.user.id;

  try {
    const { error } = await supabase
      .from('appointments')
      .update({ client_telegram_id: telegramId })
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Запись успешно выбрана.' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при выборе записи' });
  }
}