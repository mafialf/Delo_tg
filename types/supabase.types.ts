// types/supabase.types.ts

export interface Client {
  telegram_id: number;
  name: string;
  created_at: string;
}

export interface MasterVerification {
  id: string;
  name: string;
  city: string;
  location_type: 'home' | 'salон';
  services: string[];
  experience: string;
  telegram_username: string;
  about_me?: string;
  status: 'ожидает' | 'проверен' | 'отклонён';
  submitted_at: string;
}

export interface Master {
  telegram_username: string;
  name: string;
  city: string;
  location_type: 'home' | 'salон';
  services: string[];
  experience: string;
  about_me?: string;
  verified: boolean;
  price_list: Array<{ service: string; price: string }>;
  location_coords: [number, number];
  rating: number;
  total_ratings: number;
}

export interface Appointment {
  id: string;
  master_telegram_username: string;
  client_telegram_id: number;
  date: string;
  time: string;
  status:
    | 'ожидание подтверждения'
    | 'подтверждено'
    | 'выполнено'
    | 'отменено';
  created_at: string;
}

export interface Rating {
  id: string;
  appointment_id: string;
  client_telegram_id: number;
  master_telegram_username: string;
  rating: number;
  comment?: string;
  created_at: string;
}