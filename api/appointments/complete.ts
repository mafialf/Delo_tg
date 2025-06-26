// api/appointments/complete.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const { id } = req.body;

  try {
    // Получаем ID пользователя из Telegram
    const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || null;

    if (!telegramId) {
      return res.status(401).json({ error: 'Пользователь не авторизован' });
    }

    // Обновляем статус записи
    const { error } = await supabase
      .from('appointments')
      .update({ status: 'выполнено' })
      .eq('id', id)
      .eq('client_telegram_id', telegramId);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Запись завершена.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Произошла ошибка при завершении записи' });
  }
}
