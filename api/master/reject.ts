// pages/api/masters/reject.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const { telegram_username } = req.body;
  const telegramId = window.Telegram.WebApp.initDataUnsafe.user.id as string;

  try {
    // Обновляем статус заявки
    const { error: updateError } = await supabase
      .from('master_verification')
      .update({ status: 'отклонён' })
      .eq('telegram_username', telegram_username);

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    // Логируем действие админа
    const { error: logError } = await supabase
      .from('admin_actions')
      .insert({
        action: 'reject',
        admin_telegram_id: parseInt(telegramId, 10),
        master_telegram_username: telegram_username
      });

    if (logError) {
      console.error(logError.message);
    }

    res.status(200).json({ message: 'Заявка мастера отклонена.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Произошла ошибка при отклонении мастера' });
  }
}