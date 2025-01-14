import { Json } from "@/integrations/supabase/types";

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
  notification_preferences: Json;
  phone: string | null;
  email_notifications: boolean;
  phone_notifications: boolean;
  default_avatar_icon: string | null;
}

export interface ProfileUpdate {
  username?: string;
  avatar_url?: string;
  notification_preferences?: Json;
  phone?: string;
  email_notifications?: boolean;
  phone_notifications?: boolean;
  default_avatar_icon?: string;
}