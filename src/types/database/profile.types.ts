import { Json } from "./common.types";

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface ProfileUpdate {
  username?: string;
  avatar_url?: string;
}