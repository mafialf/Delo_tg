// pages/api/appointments/complete.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const { id, telegramId } = req.body;

  try {
    // Проверяем запись
    const { data: appointment, error: fetchError } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !appointment) {
      return res.status(404).json({ error: 'Запись не найдена' });
    }

    // Проверяем, принадлежит ли запись этому пользователю
    if (appointment.client_telegram_id !== parseInt(telegramId, 10)) {
      return res.status(403).json({ error: 'Нет прав на завершение этой записи' });
    }

    // Обновляем статус
    const { error } = await supabase
      .from('appointments')
      .update({ status: 'выполнено' })
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Запись успешно завершена.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Произошла ошибка при обработке запроса' });
  }
}