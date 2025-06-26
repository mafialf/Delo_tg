// pages/api/masters/apply.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const {
    name,
    city,
    location_type,
    services,
    experience,
    telegram_username,
    about_me,
    price_list,
    location_coords
  } = req.body;

  try {
    const { error } = await supabase.from('master_verification').insert([
      {
        name,
        city,
        location_type,
        services,
        experience,
        telegram_username,
        about_me,
        price_list,
        location_coords,
        status: 'ожидает',
        submitted_at: new Date().toISOString()
      }
    ]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Заявка успешно отправлена.' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при отправке заявки' });
  }
}