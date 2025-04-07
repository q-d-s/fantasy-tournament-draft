export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      draft_picks: {
        Row: {
          created_at: string | null
          id: string
          league_id: string
          pick_number: number
          team_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          league_id: string
          pick_number: number
          team_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          league_id?: string
          pick_number?: number
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "draft_picks_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "draft_picks_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite_teams: {
        Row: {
          created_at: string | null
          id: string
          team_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          team_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_teams_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      league_invites: {
        Row: {
          created_at: string | null
          email: string | null
          expires_at: string | null
          id: string
          invite_code: string | null
          league_id: string | null
          phone: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          expires_at?: string | null
          id?: string
          invite_code?: string | null
          league_id?: string | null
          phone?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          expires_at?: string | null
          id?: string
          invite_code?: string | null
          league_id?: string | null
          phone?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "league_invites_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
        ]
      }
      league_members: {
        Row: {
          joined_at: string
          league_id: string
          user_id: string
        }
        Insert: {
          joined_at?: string
          league_id: string
          user_id: string
        }
        Update: {
          joined_at?: string
          league_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "league_members_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
        ]
      }
      league_messages: {
        Row: {
          created_at: string | null
          id: string
          league_id: string
          message: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          league_id: string
          message: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          league_id?: string
          message?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "league_messages_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
        ]
      }
      leagues: {
        Row: {
          created_at: string
          draft_date: string | null
          id: string
          invite_code: string | null
          is_public: boolean | null
          logo_url: string | null
          max_players: number | null
          name: string
          owner_id: string
          settings: Json | null
          tournament_id: string
        }
        Insert: {
          created_at?: string
          draft_date?: string | null
          id?: string
          invite_code?: string | null
          is_public?: boolean | null
          logo_url?: string | null
          max_players?: number | null
          name: string
          owner_id: string
          settings?: Json | null
          tournament_id: string
        }
        Update: {
          created_at?: string
          draft_date?: string | null
          id?: string
          invite_code?: string | null
          is_public?: boolean | null
          logo_url?: string | null
          max_players?: number | null
          name?: string
          owner_id?: string
          settings?: Json | null
          tournament_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leagues_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          username?: string | null
        }
        Relationships: []
      }
      sports_news: {
        Row: {
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          published_at: string | null
          source: string | null
          title: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          source?: string | null
          title: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          source?: string | null
          title?: string
        }
        Relationships: []
      }
      teams: {
        Row: {
          created_at: string | null
          draws: number | null
          group_name: string | null
          group_points: number | null
          id: string
          knockout_points: number | null
          losses: number | null
          name: string
          total_points: number | null
          tournament_id: string | null
          wins: number | null
        }
        Insert: {
          created_at?: string | null
          draws?: number | null
          group_name?: string | null
          group_points?: number | null
          id?: string
          knockout_points?: number | null
          losses?: number | null
          name: string
          total_points?: number | null
          tournament_id?: string | null
          wins?: number | null
        }
        Update: {
          created_at?: string | null
          draws?: number | null
          group_name?: string | null
          group_points?: number | null
          id?: string
          knockout_points?: number | null
          losses?: number | null
          name?: string
          total_points?: number | null
          tournament_id?: string | null
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          name: string
          start_date: string
          type: string
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          name: string
          start_date: string
          type: string
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          name?: string
          start_date?: string
          type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      avatar_type:
        | "sportsball"
        | "football"
        | "basketball"
        | "soccer"
        | "baseball"
        | "volleyball"
        | "tennis"
        | "golf"
        | "rugby"
        | "hockey-puck"
        | "smile"
        | "grin"
        | "sunglasses"
        | "party-popper"
        | "trophy"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      avatar_type: [
        "sportsball",
        "football",
        "basketball",
        "soccer",
        "baseball",
        "volleyball",
        "tennis",
        "golf",
        "rugby",
        "hockey-puck",
        "smile",
        "grin",
        "sunglasses",
        "party-popper",
        "trophy",
      ],
    },
  },
} as const
