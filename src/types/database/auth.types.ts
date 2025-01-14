export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface AuthUser {
  id: string;
  email: string;
  created_at: string;
}