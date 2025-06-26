// pages/api/masters/approve.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const { telegram_username } = req.body;
  const telegramId = window.Telegram.WebApp.initDataUnsafe.user.id as string;

  try {
    // Получаем заявку мастера
    const { data: verificationData, error: fetchError } = await supabase
      .from('master_verification')
      .select('*')
      .eq('telegram_username', telegram_username)
      .single();

    if (fetchError || !verificationData) {
      return res.status(404).json({ error: 'Заявка не найдена' });
    }

    // Удаляем заявку из master_verification
    const { error: deleteError } = await supabase
      .from('master_verification')
      .delete()
      .eq('id', verificationData.id);

    if (deleteError) {
      return res.status(500).json({ error: deleteError.message });
    }

    // Добавляем мастера в masters
    const { error: insertError } = await supabase
      .from('masters')
      .insert({
        telegram_username,
        name: verificationData.name,
        city: verificationData.city,
        location_type: verificationData.location_type,
        services: verificationData.services,
        experience: verificationData.experience,
        about_me: verificationData.about_me || '',
        verified: true,
        price_list: verificationData.price_list || [],
        location_coords: verificationData.location_coords || [55.753994, 37.622093],
        rating: 0,
        total_ratings: 0
      });

    if (insertError) {
      return res.status(500).json({ error: insertError.message });
    }

    // Логируем действие админа
    const { error: logError } = await supabase
      .from('admin_actions')
      .insert({
        action: 'approve',
        admin_telegram_id: parseInt(telegramId, 10),
        master_telegram_username: telegram_username
      });

    if (logError) {
      console.error(logError.message);
    }

    res.status(200).json({ message: 'Мастер одобрен и добавлен в список.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Произошла ошибка при одобрении мастера' });
  }
}