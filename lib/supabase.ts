import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type FreightType = {
  id: number;
  code: string;
  lable: string;
  sort_order: number;
  created_at: string;
};

export type ParcelStatus = {
  id: number;
  code: string;
  lable: string;
  sort_order: number;
  created_at: string;
};

export type Parcel = {
  id: string;
  sender_name: string;
  sender_number: string;
  receiver_name: string;
  receiver_number: string;
  weight: string;
  status_id: number;
  freight_type_id: number;
  estimated_delivery: string | null;
  created_at: string;
  updated_at: string | null;
  delivered_at: string | null;
  duty_added: boolean;
  parcel_status?: ParcelStatus;
  feight_type?: FreightType;
};
